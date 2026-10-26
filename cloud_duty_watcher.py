# -*- coding: utf-8 -*-
"""
🏛️ المنظومة السحابية المستقلة لمداومة جسور — تعمل 24/7/365 في السحابة
تضمن عمل البوت وإرسال التقارير والتذكيرات حتى عند انطفاء حاسوب المشرف.
"""

import os
import sys
import json
import datetime
import requests

sys.stdout.reconfigure(encoding='utf-8')

BOT_TOKEN = os.environ.get("BOT_TOKEN")
if not BOT_TOKEN:
    print("Error: BOT_TOKEN environment variable not set.")
    sys.exit(1)

FIRESTORE_BASE = "https://firestore.googleapis.com/v1/projects/josour-djard/databases/(default)/documents"
WEBAPP_URL = "https://thefirststepstep-alt.github.io/josour-duty-reports/"

HAQIBA_CHAT_ID = -1004497345814
HAQIBA_THREAD_ID = 30
GROUP_7_CHAT_ID = -1002534160494

KNOWN_MEMBERS_CHATS = {
    'ayazaidi': 5795723111,
    'آية': 5795723111,
    'آية زايدي': 5795723111,
    'djbhdl': 6135186563,
    'هديل': 6135186563,
    'هديل جباري': 6135186563,
    'هَديلْ': 6135186563,
    'israadjeziri': 5795723111, # fallback
}

def broadcast_message(text):
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
    
    # 1. مجموعة الحقيبة (Topic 30)
    try:
        p1 = {
            'chat_id': HAQIBA_CHAT_ID,
            'message_thread_id': HAQIBA_THREAD_ID,
            'text': text,
            'parse_mode': 'Markdown'
        }
        r1 = requests.post(url, json=p1, timeout=10).json()
        print(f"Broadcast to Haqiba Topic {HAQIBA_THREAD_ID}: {r1.get('ok')}")
    except Exception as e:
        print(f"Error Haqiba: {e}")

    # 2. مجموعة نشطاء جسور 7
    try:
        p2 = {
            'chat_id': GROUP_7_CHAT_ID,
            'text': text,
            'parse_mode': 'Markdown'
        }
        r2 = requests.post(url, json=p2, timeout=10).json()
        print(f"Broadcast to Group 7: {r2.get('ok')}")
    except Exception as e:
        print(f"Error Group 7: {e}")

def mark_broadcasted(doc_path):
    try:
        url = f"{FIRESTORE_BASE}/{doc_path}?updateMask.fieldPaths=broadcasted"
        requests.patch(url, json={'fields': {'broadcasted': {'booleanValue': True}}}, timeout=10)
        print(f"Marked {doc_path} as broadcasted.")
    except Exception as e:
        print(f"Error marking {doc_path}: {e}")

def format_duty_report(data):
    if data.get('formattedReport'):
        return data['formattedReport']
    return (
        f"🏛️ **تقرير المداومة | نادي جسور الطلابي**\n"
        f"📅 **اليوم والتاريخ:** {data.get('day', '')} {data.get('date', '')}\n"
        f"⏰ **الفترة:** {data.get('shiftName', '')}\n"
        f"👤 **المداوم الأساسي:** {data.get('primaryMember', '')} ({data.get('primaryTime', '')})\n"
        f"👥 **المداوم المساعد:** {data.get('assistantMember', '')} ({data.get('assistantTime', '')})\n\n"
        f"📦 **حالة العتاد:** {data.get('equipmentStatus', '')}\n"
        f"⚡ **حالة الشحن:** {data.get('chargingStatus', '')}\n"
        f"🧹 **نظافة المقر:** {data.get('cleanliness', '')}\n\n"
        f"✅ **المهام المنجزة:**\n{data.get('tasksCompleted', '---')}\n\n"
        f"⏳ **المهام قيد المتابعة:**\n{data.get('tasksPending', '---')}\n\n"
        f"💡 **توصيات للمداوم القادم:**\n{data.get('recommendations', '---')}"
    )

def format_defect_report(data):
    is_defect = 'عطل' in data.get('type', '')
    header_icon = '⚠️🚨' if is_defect else '🔍📦'
    type_title = data.get('type', 'بلاغ عطل أو فقدان')
    return (
        f"{header_icon} *{type_title} — المنظومة الحفاظية على أوقاف النادي*\n\n"
        f"👤 *المبلّغ أو المسؤول:* {data.get('reporter', 'غير مسجل')}\n"
        f"📅 *تاريخ البلاغ:* {data.get('date', '---')}\n"
        f"📦 *العتاد أو الغرض المعني:* {data.get('item', '---')}\n"
        f"📝 *وصف الخلل أو ملابسات الفقدان:*\n{data.get('description', 'لا يوجد وصف')}\n\n"
        f"⚖️ _ملاحظة:_ سيتم اتخاذ الإجراءات المناسبة وفقاً للقوانين المنصوص عليها في ملف المحافظة على أوقاف النادي، وما استؤمنا عليه من أمانات."
    )

def check_reports():
    print("Checking Firebase Firestore reports (ordered by newest clientTimestamp)...")
    
    # 1. تقارير المداومة
    try:
        query_url = f"{FIRESTORE_BASE}:runQuery"
        body = {
            'structuredQuery': {
                'from': [{'collectionId': 'duty_reports'}],
                'orderBy': [{'field': {'fieldPath': 'clientTimestamp'}, 'direction': 'DESCENDING'}],
                'limit': 15
            }
        }
        res = requests.post(query_url, json=body, timeout=10).json()
        for item in res:
            doc = item.get('document')
            if not doc:
                continue
            doc_id = doc['name'].split('/')[-1]
            fields = doc.get('fields', {})
            is_broadcasted = fields.get('broadcasted', {}).get('booleanValue', False)
            if not is_broadcasted:
                data = {k: list(v.values())[0] if v else '' for k, v in fields.items()}
                print(f"🚀 Cloud: New duty report detected: {doc_id} by {data.get('primaryMember')}")
                report_msg = format_duty_report(data)
                broadcast_message(report_msg)
                mark_broadcasted(f"duty_reports/{doc_id}")
    except Exception as e:
        print(f"Error checking duty reports: {e}")

    # 2. بلاغات الأعطال والمفقودات
    try:
        query_url_d = f"{FIRESTORE_BASE}:runQuery"
        body_d = {
            'structuredQuery': {
                'from': [{'collectionId': 'defect_reports'}],
                'limit': 15
            }
        }
        res_d = requests.post(query_url_d, json=body_d, timeout=10).json()
        for item in res_d:
            doc = item.get('document')
            if not doc:
                continue
            doc_id = doc['name'].split('/')[-1]
            fields = doc.get('fields', {})
            is_broadcasted = fields.get('broadcasted', {}).get('booleanValue', False)
            if not is_broadcasted:
                data = {k: list(v.values())[0] if v else '' for k, v in fields.items()}
                print(f"🚨 Cloud: New defect report detected: {doc_id} by {data.get('reporter')}")
                defect_msg = format_defect_report(data)
                broadcast_message(defect_msg)
                mark_broadcasted(f"defect_reports/{doc_id}")
    except Exception as e:
        print(f"Error checking defect reports: {e}")

def check_reminders():
    # توقيت الجزائر (GMT+1)
    now_utc = datetime.datetime.now(datetime.timezone.utc)
    now_dz = now_utc + datetime.timedelta(hours=1)
    hour = now_dz.hour
    minute = now_dz.minute
    print(f"Algeria Local Time: {now_dz.strftime('%Y-%m-%d %H:%M')}")

    target_shift = None
    if hour == 12 and 30 <= minute <= 55:
        target_shift = 'morning'
    elif hour == 15 and 15 <= minute <= 45:
        target_shift = 'evening'

    if not target_shift:
        print("Not a reminder window right now.")
        return

    # قراءة جدول المداومة
    try:
        url = f"{FIRESTORE_BASE}/duty_schedules/current_schedule"
        res = requests.get(url, timeout=10).json()
        schedule_arr = res.get('fields', {}).get('schedule', {}).get('arrayValue', {}).get('values', [])
        
        days_map = {6: 'الأحد', 0: 'الإثنين', 1: 'الثلاثاء', 2: 'الأربعاء', 3: 'الخميس', 4: 'الجمعة', 5: 'السبت'}
        today_arabic = days_map.get(now_dz.weekday())

        for item in schedule_arr:
            day_data = item.get('mapValue', {}).get('fields', {})
            day_name = day_data.get('day', {}).get('stringValue', '')
            if day_name == today_arabic:
                shift_obj = day_data.get(target_shift, {}).get('mapValue', {}).get('fields', {})
                primary_name = shift_obj.get('primary', {}).get('stringValue', '')
                username = shift_obj.get('username', {}).get('stringValue', '').lower().replace('@', '')

                # البحث عن chat_id
                chat_id = KNOWN_MEMBERS_CHATS.get(username) or KNOWN_MEMBERS_CHATS.get(primary_name)
                if chat_id:
                    shift_title = 'الصباحية ☀️' if target_shift == 'morning' else 'المسائية 🌙'
                    msg = (
                        f"تقبل الله جهودك زميلنا الكريم **{primary_name}** 🌿\n\n"
                        f"📋 نرجو منك التفضل بملء **تقرير المداومة ({shift_title})** لتوثيق أعمال الفترة وإجراءات التسليم والعهدة.\n\n"
                        f"يمكنك فتح النموذج وتعبئته مباشرة عبر الرابط أدناه 👇"
                    )
                    url_tg = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
                    payload = {
                        'chat_id': chat_id,
                        'text': msg,
                        'parse_mode': 'Markdown',
                        'reply_markup': {
                            'inline_keyboard': [
                                [{'text': '📝 فتح وتعبئة تقرير المداومة الآن', 'web_app': {'url': WEBAPP_URL}}]
                            ]
                        }
                    }
                    requests.post(url_tg, json=payload, timeout=8)
                    print(f"Sent private shift reminder to {primary_name} ({chat_id})")
    except Exception as e:
        print(f"Error checking reminders: {e}")

if __name__ == "__main__":
    print("=" * 60)
    print("☁️ انطلاق المنظومة السحابية لمداومة جسور (24/7)")
    print("=" * 60)
    check_reports()
    check_reminders()
    print("Completed successfully ✅")

# -*- coding: utf-8 -*-
"""
🏛️ المنظومة السحابية المستقلة لمداومة جسور — تعمل 24/7/365 في السحابة
تضمن عمل البوت وإرسال التقارير والتذكيرات حتى عند انطفاء حاسوب المشرف،
وتعمل كشبكة أمان احتياطية لإكمال أي نشر لم يكتمل مباشرة من المتصفح.
"""

import os
import sys
import datetime
import requests

sys.stdout.reconfigure(encoding='utf-8')

BOT_TOKEN = os.environ.get("BOT_TOKEN")
if not BOT_TOKEN:
    print("Error: BOT_TOKEN environment variable not set.")
    sys.exit(1)

FIRESTORE_BASE = "https://firestore.googleapis.com/v1/projects/josour-djard/databases/(default)/documents"
WEBAPP_URL = "https://mirazed001-rgb.github.io/josour-duty-reports/"

HAQIBA_CHAT_ID = -1004497345814
HAQIBA_THREAD_ID = 30
GROUP_8_CHAT_ID = -1002534160494

KNOWN_MEMBERS_CHATS = {
    'ayazaidi': 5795723111,
    'آية': 5795723111,
    'آية زايدي': 5795723111,
    'djbhdl': 6135186563,
    'هديل': 6135186563,
    'هديل جباري': 6135186563,
    'هَديلْ': 6135186563,
    'israadjeziri': 5795723111,  # fallback
}


def broadcast_message(text, need_haqiba=True, need_group8=True):
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
    ok_haqiba = not need_haqiba
    ok_group8 = not need_group8

    # 1. مجموعة حقيبة نشطاء جسور — موضوع تقارير المداومة و الابلاغ (Topic 30)
    if need_haqiba:
        try:
            p1 = {
                'chat_id': HAQIBA_CHAT_ID,
                'message_thread_id': HAQIBA_THREAD_ID,
                'text': text
            }
            r1 = requests.post(url, json=p1, timeout=10).json()
            ok_haqiba = bool(r1.get('ok'))
            print(f"Broadcast to Haqiba Topic {HAQIBA_THREAD_ID}: {ok_haqiba}")
        except Exception as e:
            print(f"Error Haqiba: {e}")

    # 2. مجموعة نُشَطَاء جُسُور |8|
    if need_group8:
        try:
            p2 = {
                'chat_id': GROUP_8_CHAT_ID,
                'text': text
            }
            r2 = requests.post(url, json=p2, timeout=10).json()
            ok_group8 = bool(r2.get('ok'))
            print(f"Broadcast to Group 8: {ok_group8}")
        except Exception as e:
            print(f"Error Group 8: {e}")

    return ok_haqiba, ok_group8


def mark_broadcasted(doc_path, broadcasted, haqiba_ok, group8_ok):
    try:
        url = (
            f"{FIRESTORE_BASE}/{doc_path}"
            f"?updateMask.fieldPaths=broadcasted"
            f"&updateMask.fieldPaths=broadcastedHaqiba"
            f"&updateMask.fieldPaths=broadcastedGroup8"
        )
        payload = {
            'fields': {
                'broadcasted': {'booleanValue': bool(broadcasted)},
                'broadcastedHaqiba': {'booleanValue': bool(haqiba_ok)},
                'broadcastedGroup8': {'booleanValue': bool(group8_ok)},
            }
        }
        requests.patch(url, json=payload, timeout=10)
        print(f"Marked {doc_path}: broadcasted={broadcasted}, haqiba={haqiba_ok}, group8={group8_ok}")
    except Exception as e:
        print(f"Error marking {doc_path}: {e}")


def format_duty_report(data):
    if data.get('formattedReport'):
        return data['formattedReport']
    return (
        f"🏛️ تقرير المداومة | نادي جسور الطلابي\n"
        f"📅 اليوم والتاريخ: {data.get('day', '')} {data.get('date', '')}\n"
        f"⏰ الفترة: {data.get('shiftName', '')}\n"
        f"👤 المداوم الأساسي: {data.get('primaryMember', '')} ({data.get('primaryTime', '')})\n"
        f"👥 المداوم المساعد: {data.get('assistantMember', '')} ({data.get('assistantTime', '')})\n\n"
        f"📦 حالة العتاد: {data.get('equipmentStatus', '')}\n"
        f"⚡ حالة الشحن: {data.get('chargingStatus', '')}\n"
        f"🧹 نظافة المقر: {data.get('cleanliness', '')}\n\n"
        f"✅ المهام المنجزة:\n{data.get('tasksCompleted', '---')}\n\n"
        f"⏳ المهام قيد المتابعة:\n{data.get('tasksPending', '---')}\n\n"
        f"💡 توصيات للمداوم القادم:\n{data.get('recommendations', '---')}"
    )


def format_defect_report(data):
    is_defect = 'عطل' in data.get('type', '')
    header_icon = '⚠️🚨' if is_defect else '🔍📦'
    type_title = data.get('type', 'بلاغ عطل أو فقدان')
    return (
        f"{header_icon} {type_title} — المنظومة الحفاظية على أوقاف النادي 🏛️\n"
        f"#سجل_الأعطال_والفقدان #أوقاف_النادي\n\n"
        f"📌 نوع البلاغ: [ {type_title} ]\n"
        f"👤 المبلّغ أو المسؤول: [ {data.get('reporter', 'غير مسجل')} ]\n"
        f"📅 تاريخ البلاغ: [ {data.get('date', '---')} ]\n"
        f"📦 العتاد أو الغرض المعني: [ {data.get('item', '---')} ]\n"
        f"📝 وصف الخلل أو ملابسات الفقدان:\n{data.get('description', 'لا يوجد وصف')}\n\n"
        f"⚖️ ملاحظة إدارية: سيتم اتخاذ الإجراءات المناسبة وفقاً للقوانين المنصوص عليها في ملف المحافظة على أوقاف النادي، صيانةً للأمانة."
    )


def _process_collection(collection_name, formatter):
    query_url = f"{FIRESTORE_BASE}:runQuery"
    body = {
        'structuredQuery': {
            'from': [{'collectionId': collection_name}],
            'orderBy': [{'field': {'fieldPath': 'createdAt'}, 'direction': 'DESCENDING'}],
            'limit': 20
        }
    }
    res = requests.post(query_url, json=body, timeout=15).json()
    if not isinstance(res, list):
        print(f"Unexpected Firestore response for {collection_name}: {res}")
        return

    for item in res:
        doc = item.get('document')
        if not doc:
            continue
        doc_id = doc['name'].split('/')[-1]
        fields = doc.get('fields', {})

        is_broadcasted = fields.get('broadcasted', {}).get('booleanValue', False)
        if is_broadcasted:
            continue

        haqiba_done = fields.get('broadcastedHaqiba', {}).get('booleanValue', False)
        group8_done = fields.get('broadcastedGroup8', {}).get('booleanValue', False)
        need_haqiba = not haqiba_done
        need_group8 = not group8_done

        if not need_haqiba and not need_group8:
            mark_broadcasted(f"{collection_name}/{doc_id}", True, True, True)
            continue

        data = {k: list(v.values())[0] if v else '' for k, v in fields.items()}
        print(f"🚀 Cloud backup broadcast for {collection_name}/{doc_id} (need_haqiba={need_haqiba}, need_group8={need_group8})")
        msg = formatter(data)
        ok_haqiba, ok_group8 = broadcast_message(msg, need_haqiba=need_haqiba, need_group8=need_group8)

        final_haqiba = haqiba_done or ok_haqiba
        final_group8 = group8_done or ok_group8
        final_all = final_haqiba and final_group8
        mark_broadcasted(f"{collection_name}/{doc_id}", final_all, final_haqiba, final_group8)


def check_reports():
    print("Checking Firebase Firestore reports (ordered by newest createdAt)...")

    # 1. تقارير المداومة
    try:
        _process_collection('duty_reports', format_duty_report)
    except Exception as e:
        print(f"Error checking duty reports: {e}")

    # 2. بلاغات الأعطال والمفقودات
    try:
        _process_collection('defect_reports', format_defect_report)
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
                        f"تقبل الله جهودك زميلنا الكريم {primary_name} 🌿\n\n"
                        f"📋 نرجو منك التفضل بملء تقرير المداومة ({shift_title}) لتوثيق أعمال الفترة وإجراءات التسليم والعهدة.\n\n"
                        f"يمكنك فتح النموذج وتعبئته مباشرة عبر الرابط أدناه 👇"
                    )
                    url_tg = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
                    payload = {
                        'chat_id': chat_id,
                        'text': msg,
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

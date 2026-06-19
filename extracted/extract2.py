import json
import os

try:
    with open('ai_chat.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    extracted_files = {}
    found_code = False

    for msg in data:
        if 'parts' in msg:
            for part in msg['parts']:
                if part.get('partType') == 'code-chat-assistant-text':
                    try:
                        content = json.loads(part.get('contentJson', '{}'))
                        if 'text' in content and '```' in content['text']:
                            found_code = True
                            text = content['text']
                            blocks = text.split('```')
                            for i in range(1, len(blocks), 2):
                                block = blocks[i]
                                if '\n' in block:
                                    lang, code = block.split('\n', 1)
                                    print(f'=== Code Block: {lang.strip()} ===')
                                    print(code[:200] + '...\n')
                    except Exception as e:
                        print('error:', e)
    if not found_code:
        print("No markdown code blocks found.")
except Exception as e:
    print(e)

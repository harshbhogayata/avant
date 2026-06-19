import json
import os

with open('ai_chat.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

extracted_files = {}

for msg in data:
    if 'parts' in msg:
        for part in msg['parts']:
            if part.get('partType') == 'code-chat-assistant-text':
                try:
                    content = json.loads(part.get('contentJson', '{}'))
                    if 'text' in content and '\\\' in content['text']:
                        print('Found code block!')
                        text = content['text']
                        # Simple extraction
                        blocks = text.split('\\\')
                        for i in range(1, len(blocks), 2):
                            block = blocks[i]
                            if '\n' in block:
                                lang, code = block.split('\n', 1)
                                print(f'Extracted {lang.strip()} code.')
                except Exception as e:
                    print('error:', e)

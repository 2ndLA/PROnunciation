#! /usr/bin/env python
# -*- coding: utf-8 -*-
# vim:fenc=utf-8
#
# Copyright © 2019 root <root@MrRobot.local>
#

"""
                WordHelper.py
A script that help you to manage word data in this project.

What it does:
1. Read new words listed from file `NewWords.txt`
2. Download corresponding audio resources from google translate and save to 
specific asset folder
3. Generates corresponding data format
4. Sort all words alphabetic then save them in corresponding word files

How to use:
1. Sync your new words from github issues to `NewWords.txt`, one word per line
2. Run the script with `python3 WordHelper.py`
3. Enjoy
"""
from concurrent.futures import ThreadPoolExecutor
import collections
import json
import os
import urllib.request
from urllib.error import URLError


GOOGLE_TRANSLATE_AUDIO_API = (
    "https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=en&q="
)
GOOGLE_TRANSLATE_CN = (
    "https://translate.google.cn/#view=home&op=translate&sl=en&tl=zh-CN&text={}"
)
DATA_DIR = "../src/data/json/"
JSON_FILE_EXT = ".json"
AUDIO_EXT = ".mp3"
NEW_WORD_FILE = "./NewWords.txt"
ASSET_DIR = "../src/audio/"
EXEC_PATH_MSG = "This script should be run under `helpers` directory."
VPN_MSG = "VPN is needed."
MAX_WORKERS = 16

word_db = {}


def exec_path_prompt(msg):
    print(msg)
    exit(0)


def update_word_db(word, letter):
    """
    Update word_db by given `word`'s first letter.
    New word will be inserted into word_db only when this function return `True`
    """
    if os.path.exists(DATA_DIR) and os.path.isdir(DATA_DIR):
        if letter in word_db.keys():
            return not word.lower() in word_db[letter].keys()
        else:
            json_file = letter + JSON_FILE_EXT
            try:
                with open(os.path.join(DATA_DIR, json_file), "r") as fp:
                    words = json.load(fp)
                    if word.lower() in words.keys():
                        return False
                    else:
                        # Update word_db when new word is actually needed
                        word_db[letter] = words
            except FileNotFoundError:
                with open(os.path.join(DATA_DIR, json_file), "w+") as fp:
                    word_db[letter] = {}
                    json.dump(word_db[letter], fp, indent=2, ensure_ascii=False)
                    print("File `{file}` created.".format(file=json_file))
            return True
    else:
        exec_path_prompt(EXEC_PATH_MSG)


def download_audio_resource(word):
    """
    Download related google translate audio resource
    """
    if os.path.exists(ASSET_DIR + word + AUDIO_EXT):
        print("Audio already exists, downloading being skiped.")
        return
    url = GOOGLE_TRANSLATE_AUDIO_API + word
    url = urllib.parse.quote(url, safe="://./_\?=&")
    audio_name = word + AUDIO_EXT
    # fake user-agent to prevent 403 error
    opener = urllib.request.build_opener()
    opener.addheaders = [("User-agent", "Mozilla/5.0")]
    urllib.request.install_opener(opener)
    print("Downloading `{0}.mp3` from Google Translate.".format(word))
    print("URL: {}".format(url))
    try:
        urllib.request.urlretrieve(url, os.path.join(ASSET_DIR, audio_name))
    except URLError as e:
        print(f"Error: {e}")
        exec_path_prompt(VPN_MSG)
    print("Download `{0}.mp3` successfully.".format(word))


def insert_new_word(word, letter):
    # insert new word into word_db
    new_word = {
        "spell": word,
        "symbol": "/placeholder/",
        "audio": "{0}.mp3".format(word),
        "references": [
            {"desc": "Google Translate", "url": GOOGLE_TRANSLATE_CN.format(word)}
        ],
    }
    word_db[letter][word.lower()] = new_word


def sync_word_db_to_file():
    for letter, words in word_db.items():
        with open(os.path.join(DATA_DIR, letter + JSON_FILE_EXT), "w") as fp:
            ordered_words = collections.OrderedDict(sorted(words.items()))
            json.dump(ordered_words, fp, indent=2, ensure_ascii=False)
    print("Sync word_db to file successfully.")


def process_word(word):
    letter = word[0].lower()
    if update_word_db(word, letter):
        # word does not exist in word_db
        download_audio_resource(word)
        insert_new_word(word, letter)
    else:
        print("`{0}` already exists, being skipped.".format(word))


def main():
    try:
        words = []
        with open(NEW_WORD_FILE, "r") as fp:
            for line in fp.readlines():
                words.append(line.strip())
        workers_num = min(MAX_WORKERS, len(words))
        with ThreadPoolExecutor(workers_num) as executor:
            executor.map(process_word, words)
    except FileNotFoundError as e:
        print(f"Error: {e}")
        exec_path_prompt(EXEC_PATH_MSG)
    sync_word_db_to_file()
    # cleanup
    open(NEW_WORD_FILE, "w").close()


if __name__ == "__main__":
    main()

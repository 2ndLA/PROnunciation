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
import os
import json
import urllib.request

GOOGLE_TRANSLATION_API = (
    "https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=en&q="
)
DATA_DIR = "../src/data/json/"
NEW_WORD_FILE = "./NewWords.txt"
ASSET_DIR = "../src/audio/"


def get_word_db():
    word_db = {}
    if os.path.exists(DATA_DIR) and os.path.isdir(DATA_DIR):
        for _file in os.listdir(DATA_DIR):
            with open(os.path.join(DATA_DIR, _file), "r") as fp:
                key = os.path.basename(_file).split(".")[0]
                word_db[key] = json.load(fp)
    return word_db


def word_exist_in_db(word, word_db):
    letter = word[0].lower()
    if word in [item["spell"] for item in word_db[letter]]:
        return True
    return False


def download_audio_resource(word):
    # download related google translate audio resource
    url = GOOGLE_TRANSLATION_API + word
    audio_name = word + ".mp3"
    # fake user-agent to prevent 403 error
    opener = urllib.request.build_opener()
    opener.addheaders = [("User-agent", "Mozilla/5.0")]
    urllib.request.install_opener(opener)
    urllib.request.urlretrieve(url, os.path.join(ASSET_DIR, audio_name))
    print("Download {0}.mp3 from google translation".format(word))


def insert_new_word(word, word_db):
    # insert new word into word_db
    letter = word[0].lower()
    new_word = {
        "spell": word,
        "symbol": "/placeholder/",
        "audio": "{0}.mp3".format(word),
        "reference": {"desc": "", "url": "http://placehodler.com/"},
    }
    word_db[letter].append(new_word)
    word_db[letter].sort(key=lambda word: word["spell"].lower())


def sync_word_db_to_file(word_db):
    for _file in os.listdir(DATA_DIR):
        with open(os.path.join(DATA_DIR, _file), "w") as fp:
            key = os.path.basename(_file).split(".")[0]
            json.dump(word_db[key], fp, ensure_ascii=False)
    print("Sync word_db to file successfully")


def main():
    word_db = get_word_db()
    with open(NEW_WORD_FILE, "r") as fp:
        for line in fp.readlines():
            word = line.strip()
            if not word_exist_in_db(word, word_db):
                download_audio_resource(word)
                insert_new_word(word, word_db)
            else:
                print("{0} already exist, being skipped".format(word))
    sync_word_db_to_file(word_db)
    # cleanup
    open(NEW_WORD_FILE, "w").close()


if __name__ == "__main__":
    main()

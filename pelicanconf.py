#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = 'Median Group'
SITENAME = 'Median Group'
SITEURL = ''

PATH = 'content'

TIMEZONE = 'America/Los_Angeles'

DEFAULT_LANG = 'en'

USE_FOLDER_AS_CATEGORY = True
THEME = 'theme'
TYPOGRIFY = True
PAGE_ORDER_BY = 'order'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# pages
# pages = ['Home', 'Projects', 'Team', 'Contact']
# Blogroll
'''
LINKS = (('Pelican', 'http://getpelican.com/'),
         ('Python.org', 'http://python.org/'),
         ('Jinja2', 'http://jinja.pocoo.org/'),
         ('You can modify those links in your config file', '#'),)
'''
# Social widget
'''
SOCIAL = (('You can add links in your config file', '#'),
          ('Another social link', '#'),)
'''
DEFAULT_PAGINATION = False
DEFAULT_DATE = 'fs'
SLUGIFY_SOURCE = 'basename'

MARKDOWN = {
    'extensions' : ['codehilite', 'extra', 'toc'],
    'extension_configs': {
        'markdown.extensions.codehilite': {'css_class': 'highlight'},
        'markdown.extensions.extra': {},
        'markdown.extensions.meta': {},
    },
    'output_format': 'html5',
}
# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True

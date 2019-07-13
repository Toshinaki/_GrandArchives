# Configuration file for the Sphinx documentation builder.
#
# This file only contains a selection of the most common options. For a full
# list see the documentation:
# http://www.sphinx-doc.org/en/master/config

# -- Path setup --------------------------------------------------------------

# If extensions (or modules to document with autodoc) are in another directory,
# add these directories to sys.path here. If the directory is relative to the
# documentation root, use os.path.abspath to make it absolute, like shown here.
#
# import os
# import sys
# sys.path.insert(0, os.path.abspath('.'))


# -- Project information -----------------------------------------------------

project = 'gate-of-babylon'
copyright = '2019, Toshinaki'
author = 'Toshinaki'


# -- General configuration ---------------------------------------------------

# Add any Sphinx extension module names here, as strings. They can be
# extensions coming with Sphinx (named 'sphinx.ext.*') or your custom
# ones.
extensions = [
]

# Add any paths that contain templates here, relative to this directory.
templates_path = ['_templates']

# List of patterns, relative to source directory, that match files and
# directories to ignore when looking for source files.
# This pattern also affects html_static_path and html_extra_path.
exclude_patterns = []


# -- Options for HTML output -------------------------------------------------

# The theme to use for HTML and HTML Help pages.  See the documentation for
# a list of builtin themes.
#
# html_theme = 'sphinx_rtd_theme'
import t3SphinxThemeRtd
html_theme = 't3SphinxThemeRtd'
html_theme_path = [t3SphinxThemeRtd.get_html_theme_path()]
# import stanford_theme
# html_theme = "stanford_theme"
# html_theme_path = [stanford_theme.get_html_theme_path()]
# import sphinxbootstrap4theme
# html_theme = 'sphinxbootstrap4theme'
# html_theme_path = [sphinxbootstrap4theme.get_path()]
# html_logo = '_static/logo.jpg'

# Add any paths that contain custom static files (such as style sheets) here,
# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".
html_static_path = ['_static']

master_doc = 'index'

# html_theme_options = {
#     'navigation_depth': 7,
# }

# bs4 options
# html_theme_options = {
#     # Navbar style.
#     # Values: 'fixed-top', 'full' (Default: 'fixed-top')
#     'navbar_style' : 'fixed-top',

#     # Navbar link color modifier class.
#     # Values: 'dark', 'light' (Default: 'dark')
#     'navbar_color_class' : 'dark',

#     # Navbar background color class.
#     # Values: 'inverse', 'primary', 'faded', 'success',
#     #         'info', 'warning', 'danger' (Default: 'inverse')
#     'navbar_bg_class' : 'inverse',

#     # Show global TOC in navbar.
#     # To display up to 4 tier in the drop-down menu.
#     # Values: True, False (Default: True)
#     'navbar_show_pages' : True,

#     # Link name for global TOC in navbar.
#     # (Default: 'Pages')
#     'navbar_pages_title' : 'Pages',

#     # Specify a list of menu in navbar.
#     # Tuples forms:
#     #  ('Name', 'external url or path of pages in the document', boolean)
#     # Third argument:
#     # True indicates an external link.
#     # False indicates path of pages in the document.
#     'navbar_links' : [
#          ('Home', 'index', False),
#         #  ("Link", "http://example.com", True)
#     ],

#     # Total width(%) of the document and the sidebar.
#     # (Default: 80%)
#     'main_width' : '95%',

#     # Render sidebar.
#     # Values: True, False (Default: True)
#     'show_sidebar' : True,

#     # Render sidebar in the right of the document.
#     # Values：True, False (Default: False)
#     'sidebar_right': False,

#     # Fix sidebar.
#     # Values: True, False (Default: True)
#     'sidebar_fixed': True,

#     # Html table header class.
#     # Values: 'inverse', 'light' (Deafult: 'inverse')
#     'table_thead_class' : 'inverse'
# }

import os
on_rtd = os.environ.get('READTHEDOCS', None) == 'True'

if on_rtd:
    latex_elements = {
        # Additional stuff for the LaTeX preamble.
        'preamble': "".join((
            '\hypersetup{unicode=true}',
            '\usepackage[utf8x]{inputenc}',
            '\usepackage{CJKutf8}',
        )),
    }
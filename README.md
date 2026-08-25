# Yi-Jun Chen's Personal Academic Website

A static site: four pages sharing one stylesheet.

```
index.html                  About
publications/index.html     /publications/
experience/index.html       /experience/
cv/index.html               /cv/

css/site.css                all styling, shared by every page
js/theme.js                 light/dark switch
img/YJ.svg                  browser tab icon
file/Resume_Yijun_Chen.pdf  

stamp.py                    refreshes the footer timestamp
```

**Local preview**

```bash
python3 -m http.server 8000
```

**Updating the footer timestamp**

Run this once after editing. It refreshes the `Last updated` line and the
copyright year on every page:

```bash
python3 stamp.py
```

## Copyright

© 2026 Yi-Jun Chen. All rights reserved.

The content of this site (text, CV, publication list) and its design belong to
the author. You are welcome to take inspiration from it, but **any reuse,
adaptation, or redistribution must credit the author and link back to the
original site**. Publications remain subject to the licences of their publishers.
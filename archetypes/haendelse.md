---
title: "{{ replace (substr .File.ContentBaseName 11) "-" " " | humanize }}"
date: {{ substr .File.ContentBaseName 0 10 }}
type: ""
kilder:
  - titel: ""
    url: ""
---

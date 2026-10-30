/* Tiny text PDF maker for The Teen Playbook. No outside libraries.
   Letter size, Helvetica and Helvetica-Bold, real text (searchable), clickable links. */
(function () {
  var W = {"R":[278,278,355,556,556,889,667,222,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,278,278,584,584,584,556,1015,667,667,722,722,667,611,778,722,278,500,667,556,833,722,778,667,778,722,667,611,722,667,944,667,667,611,278,278,278,469,556,222,556,556,500,556,556,278,556,556,222,222,500,222,833,556,556,556,556,333,500,278,556,500,722,500,500,500,334,260,334,584],"B":[278,333,474,556,556,889,722,278,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,333,333,584,584,584,611,975,722,722,722,722,667,611,778,722,278,556,722,611,833,722,778,667,778,722,667,611,722,667,944,667,667,611,333,278,333,584,556,278,556,611,556,611,556,333,611,611,278,278,556,278,889,611,611,611,611,389,556,333,611,556,778,556,556,500,389,280,389,584]};
  var PW = 612, PH = 792, M = 54, CW = PW - 2 * M;
  var RED = "0.878 0.204 0.247", INK = "0.04 0.04 0.043", MUTE = "0.42 0.4 0.37", BLUE = "0.05 0.3 0.7";

  function clean(s) {
    return String(s == null ? "" : s)
      .replace(/[‘’ʼ]/g, "'").replace(/[“”]/g, '"')
      .replace(/[–—−]/g, "-").replace(/…/g, "...").replace(/ /g, " ")
      .replace(/&rarr;|→/g, "->").replace(/[^\x20-\x7e]/g, "");
  }
  function tw(s, font, size) {
    var t = 0, a = W[font];
    for (var i = 0; i < s.length; i++) { var c = s.charCodeAt(i) - 32; t += (c >= 0 && c < 95) ? a[c] : 556; }
    return t * size / 1000;
  }
  function wrap(s, font, size, width) {
    var words = clean(s).split(/\s+/), lines = [], cur = "";
    for (var i = 0; i < words.length; i++) {
      var w = words[i]; if (!w) continue;
      var test = cur ? cur + " " + w : w;
      if (tw(test, font, size) <= width) { cur = test; continue; }
      if (cur) lines.push(cur);
      while (tw(w, font, size) > width) { // break very long tokens (URLs)
        var k = w.length; while (k > 1 && tw(w.slice(0, k), font, size) > width) k--;
        lines.push(w.slice(0, k)); w = w.slice(k);
      }
      cur = w;
    }
    if (cur) lines.push(cur);
    return lines.length ? lines : [""];
  }
  function esc(s) { return s.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)"); }

  function Doc(footer) {
    this.pages = []; this.footer = footer; this.newPage();
  }
  Doc.prototype.newPage = function () {
    this.ops = []; this.annots = []; this.pages.push({ops: this.ops, annots: this.annots}); this.y = PH - M;
  };
  Doc.prototype.need = function (h) { if (this.y - h < M + 28) this.newPage(); };
  Doc.prototype.text = function (x, y, s, font, size, color) {
    this.ops.push("BT /" + (font === "B" ? "F2" : "F1") + " " + size + " Tf " + (color || INK) + " rg " + x.toFixed(2) + " " + y.toFixed(2) + " Td (" + esc(s) + ") Tj ET");
  };
  Doc.prototype.rect = function (x, y, w, h, fill, stroke) {
    if (fill) this.ops.push(fill + " rg " + x + " " + y + " " + w + " " + h + " re f");
    if (stroke) this.ops.push(stroke + " RG 0.8 w " + x + " " + y + " " + w + " " + h + " re S");
  };
  Doc.prototype.para = function (s, o) {
    o = o || {}; var font = o.font || "R", size = o.size || 10.5, lead = size * 1.38, x = M + (o.indent || 0);
    var lines = wrap(s, font, size, CW - (o.indent || 0));
    for (var i = 0; i < lines.length; i++) { this.need(lead); this.y -= lead; this.text(x, this.y, lines[i], font, size, o.color); }
    if (o.after !== 0) this.y -= (o.after || 4);
  };
  Doc.prototype.heading = function (s) {
    this.need(40); this.y -= 14; this.text(M, this.y - 10, clean(s).toUpperCase(), "B", 11.5, RED); this.y -= 16;
    this.ops.push(RED + " RG 1 w " + M + " " + (this.y - 2) + " m " + (M + 36) + " " + (this.y - 2) + " l S"); this.y -= 4;
  };
  Doc.prototype.item = function (marker, s, o) {
    o = o || {}; var size = 10.5, lead = size * 1.38, ind = 22;
    var lines = wrap(s, "R", size, CW - ind);
    this.need(lead * Math.min(lines.length, 3));
    for (var i = 0; i < lines.length; i++) {
      this.need(lead); this.y -= lead;
      if (i === 0) {
        if (marker === "box") this.rect(M + 2, this.y - 1, 9, 9, null, INK);
        else this.text(M, this.y, marker, "B", size, RED);
      }
      this.text(M + ind, this.y, lines[i], "R", size);
    }
    this.y -= 4;
  };
  Doc.prototype.fact = function (label, value) {
    var size = 10.5, lead = size * 1.38, lw = 150;
    var ll = wrap(label, "B", size, lw - 8), vl = wrap(value, "R", size, CW - lw);
    var n = Math.max(ll.length, vl.length);
    this.need(lead * n + 6);
    var top = this.y;
    for (var i = 0; i < n; i++) {
      this.y -= lead;
      if (ll[i]) this.text(M, this.y, ll[i], "B", size);
      if (vl[i]) this.text(M + lw, this.y, vl[i], "R", size);
    }
    this.y -= 5;
    this.ops.push("0.86 0.84 0.8 RG 0.5 w " + M + " " + (this.y + 2) + " m " + (PW - M) + " " + (this.y + 2) + " l S");
  };
  Doc.prototype.link = function (label, url) {
    var size = 10, lead = size * 1.4;
    this.para(label, {font: "B", size: 10, after: 0});
    var lines = wrap(url, "R", 9.5, CW - 12);
    for (var i = 0; i < lines.length; i++) {
      this.need(lead); this.y -= lead;
      this.text(M + 12, this.y, lines[i], "R", 9.5, BLUE);
      this.annots.push({x: M + 12, y: this.y - 2, w: tw(lines[i], "R", 9.5), h: 12, url: clean(url)});
    }
    this.y -= 5;
  };
  Doc.prototype.output = function () {
    var objs = [], self = this;
    function add(s) { objs.push(s); return objs.length; }
    var f1 = add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>");
    var f2 = add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>");
    var pagesId = add(null);
    var kids = [], total = this.pages.length;
    this.pages.forEach(function (p, i) {
      var foot = [
        "0.86 0.84 0.8 RG 0.5 w " + M + " " + (M + 4) + " m " + (PW - M) + " " + (M + 4) + " l S",
        "BT /F1 8.5 Tf " + MUTE + " rg " + M + " " + (M - 8) + " Td (" + esc(clean(self.footer)) + ") Tj ET",
        "BT /F1 8.5 Tf " + MUTE + " rg " + (PW - M - 40) + " " + (M - 8) + " Td (" + esc("Page " + (i + 1) + " of " + total) + ") Tj ET"
      ];
      var stream = p.ops.concat(foot).join("\n");
      var cId = add("<< /Length " + stream.length + " >>\nstream\n" + stream + "\nendstream");
      var annIds = p.annots.map(function (a) {
        return add("<< /Type /Annot /Subtype /Link /Border [0 0 0] /Rect [" + [a.x, a.y, a.x + a.w, a.y + a.h].map(function (n) { return n.toFixed(1); }).join(" ") + "] /A << /S /URI /URI (" + esc(a.url) + ") >> >>");
      });
      kids.push(add("<< /Type /Page /Parent " + pagesId + " 0 R /MediaBox [0 0 " + PW + " " + PH + "] /Resources << /Font << /F1 " + f1 + " 0 R /F2 " + f2 + " 0 R >> >> /Contents " + cId + " 0 R" + (annIds.length ? " /Annots [" + annIds.map(function (n) { return n + " 0 R"; }).join(" ") + "]" : "") + " >>"));
    });
    objs[pagesId - 1] = "<< /Type /Pages /Kids [" + kids.map(function (k) { return k + " 0 R"; }).join(" ") + "] /Count " + kids.length + " >>";
    var info = add("<< /Title (" + esc(clean(this.title || "The Teen Playbook")) + ") /Author (Lawrence Totimeh Jr.) /Creator (lawrencetotimeh.com/playbook) >>");
    var cat = add("<< /Type /Catalog /Pages " + pagesId + " 0 R >>");
    var out = "%PDF-1.4\n", offs = [];
    objs.forEach(function (o, i) { offs.push(out.length); out += (i + 1) + " 0 obj\n" + o + "\nendobj\n"; });
    var xref = out.length;
    out += "xref\n0 " + (objs.length + 1) + "\n0000000000 65535 f \n";
    offs.forEach(function (o) { out += ("0000000000" + o).slice(-10) + " 00000 n \n"; });
    out += "trailer\n<< /Size " + (objs.length + 1) + " /Root " + cat + " 0 R /Info " + info + " 0 R >>\nstartxref\n" + xref + "\n%%EOF";
    return out; // ASCII only, so string length equals byte length
  };

  // Render one sheet (already built for a state) onto the doc.
  function sheetToDoc(doc, d, stateName, first) {
    if (!first) doc.newPage();
    doc.rect(0, PH - 96, PW, 96, RED);
    doc.text(M, PH - 40, "THE TEEN PLAYBOOK" + (stateName ? "  /  " + clean(stateName).toUpperCase() : ""), "B", 9.5, "1 1 1");
    var tl = wrap(d.title, "B", 22, CW);
    doc.text(M, PH - 70, tl[0], "B", 22, "1 1 1");
    doc.y = PH - 96 - 8;
    if (tl.length > 1) doc.para(tl.slice(1).join(" "), {font: "B", size: 16});
    doc.para(d.why, {size: 11, after: 6});
    if (d.facts && d.facts.length) { doc.heading(stateName ? "The rules in " + stateName : "Know this first"); d.facts.forEach(function (f) { doc.fact(f[0], f[1]); }); }
    doc.heading("Step by step");
    d.steps.forEach(function (s, i) { doc.item((i + 1) + ".", s); });
    if (d.bring && d.bring.length) { doc.heading("What to bring"); d.bring.forEach(function (s) { doc.item("box", s); }); }
    if (d.parent && d.parent.length) { doc.heading("Questions to ask your parent"); d.parent.forEach(function (s) { doc.item("box", s); }); }
    if (d.watch && d.watch.length) { doc.heading("Watch out"); d.watch.forEach(function (s) { doc.item("!", s); }); }
    var links = (d.links || []).filter(function (l) { return l[1]; });
    if (links.length) { doc.heading("Official links"); links.forEach(function (l) { doc.link(l[0], l[1]); }); }
    doc.heading("Notes");
    for (var i = 0; i < 4; i++) { doc.need(22); doc.y -= 22; doc.ops.push("0.75 0.73 0.7 RG 0.5 w " + M + " " + doc.y + " m " + (PW - M) + " " + doc.y + " l S"); }
    doc.y -= 10;
    doc.para("Last checked " + d.checked + ". Rules and fees change. Confirm with the official links before you go. I'm an educator, not an attorney. This is not legal or tax advice.", {size: 8.5, color: MUTE});
  }

  window.PlaybookPDF = {
    make: function (items, title) { // items: [{data, stateName}]
      var doc = new Doc("lawrencetotimeh.com/playbook  |  Print it free or cheap at your public library");
      doc.title = title;
      items.forEach(function (it, i) { sheetToDoc(doc, it.data, it.stateName, i === 0); });
      return doc.output();
    }
  };
})();

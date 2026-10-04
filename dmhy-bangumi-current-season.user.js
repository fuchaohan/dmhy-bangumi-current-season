// ==UserScript==
// @name         动漫花园新番索引更新脚本（自托管复刻版）
// @namespace    https://github.com/fuchaohan/dmhy-bangumi-current-season
// @version      0.6.0
// @description  update data of new season bangumi on dmhy (self-hosted replica)
// @description:zh-CN 更新动漫花园新番列表及搜索关键词（数据改由 jsDelivr 从本仓库分发）
// @author       Masaiki (original), fuchaohan (replica)
// @match        *://dmhy.org/*
// @match        *://www.dmhy.org/*
// @match        *://share.dmhy.org/*
// @match        *://dmhy.anoneko.com/*
// @match        *://dmhy.ye1213.com/*
// @match        *://share.dongmanhuayuan.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    Element.prototype.empty = function () {
        while (this.firstChild) this.removeChild(this.firstChild);
        return this;
    }
    function createElementWithAttr(TagName, Attrs = {}, Text = '') {
        let element = document.createElement(TagName);
        for (let attr in Attrs)
            element[attr] = Attrs[attr];
        element.textContent = Text;
        return element;
    }
    function loadJS(url, callback) {
        let script = document.createElement('script'),
            fn = callback || function () { };
        script.type = 'text/javascript';
        script.onload = function () {
            fn();
        };
        script.src = url;
        document.head.appendChild(script);
    }
    // 按序尝试多个 URL，返回第一个真正加载成功的。用于主源被污染/超时时的自动切源。
    // isReady 用于判断数据是否真的注入 —— script.onload 在 404 时也会触发（内容是错误页），
    // 必须校验全局变量。注意数据文件用 let 声明，顶层 let 只进词法环境、不挂 window，
    // 所以要用 new Function 直接探测标识符，不能查 window。
    function loadJSWithFallback(urls, isReady, callback) {
        let i = 0;
        (function next() {
            if (i >= urls.length) {
                console.warn('[dmhy-bangumi] 所有数据源均加载失败：', urls);
                return;
            }
            let url = urls[i++];
            let script = document.createElement('script');
            script.type = 'text/javascript';
            script.onload = function () {
                if (!isReady()) return next();
                if (i > 1) console.info('[dmhy-bangumi] 已切换到备用源：', url);
                callback(url);
            };
            script.onerror = function () { next(); };
            script.src = url;
            document.head.appendChild(script);
        })();
    }
    let ShowAllBangumi = localStorage.ShowAllBangumi !== "false";
    let today = new Date();
    let day = today.getDay();
    let trs = [];
    let panel = document.querySelector(".jmd");
    function data2doms() {
        trs = [];
        for (let i = 0; i < bangumi_data.length; i++) {
            let td = document.createElement('td');
            for (let j = 0; j < bangumi_data[i].length; j++) {
                if (bangumi_data[i][j][2] && today < new Date(bangumi_data[i][j][2])) continue;
                if (bangumi_data[i][j][3] && today > new Date(bangumi_data[i][j][3])) continue;
                let name = bangumi_data[i][j][0];
                let keyword = bangumi_data[i][j][1] || name;
                let link = createElementWithAttr('a', {
                    'href': `/topics/list?keyword=${encodeURIComponent(keyword)}`
                }, name);
                td.appendChild(link);
            }
            let tr = document.createElement('tr');
            let th = createElementWithAttr('th', null, bangumi_group_name[i]);
            tr.appendChild(th);
            tr.appendChild(td);
            trs.push(tr);
        }
        trs[day].classList.add('today');
    }
    function bangumiRefresh() {
        panel.empty();
        if (ShowAllBangumi)
            trs.forEach((item) => { panel.appendChild(item); });
        else {
            for (let i = 5; i <= 8; ++i)
                panel.appendChild(trs[(day + i) % 7]);
            for (let i = 7; i < bangumi_data.length; ++i)
                panel.appendChild(trs[i]);
        }
        panel.childNodes.forEach((item, index) => {
            if (index % 2) item.classList.add("odd");
            else item.classList.add("even");
        });
    }
    document.querySelector("div[id$='_ad']").removeAttribute('align');
    const REPO = 'fuchaohan/dmhy-bangumi-current-season@master';
    // 数据源 CDN：主源 + 三个 jsDelivr 镜像 + EdgeOne 备用，按序自动容灾。
    const DATA_CDNS = [
        'https://cdn.jsdelivr.net/gh/',
        'https://fastly.jsdelivr.net/gh/',
        'https://gcore.jsdelivr.net/gh/',
        'https://testingcf.jsdelivr.net/gh/',
    ];
    const EDGEONE_CDN = 'https://dmhy-bangumi-current-season.edgeone.app/';
    // 旧版本可能把镜像/EdgeOne URL 存进了 localStorage，按文件名取回季度标识。
    const storedFile = () => (localStorage.DataURL || '').split('/').pop();

    let switchButton = createElementWithAttr('a', {
        'href': "javascript:;",
        'style': "margin-right:2px;"
    }, '顯示切換');
    switchButton.onclick = () => {
        ShowAllBangumi = !ShowAllBangumi;
        localStorage.ShowAllBangumi = ShowAllBangumi;
        bangumiRefresh();
    };
    let select = createElementWithAttr('select', { 'style': 'margin-right:2px; background-color:#247; color:#FFF' });
    select.onchange = () => {
        localStorage.DataURL = history_list.urls[select.selectedIndex];
        location.reload();
    };
    document.querySelector('.nav_title').style.paddingBottom = '5px';
    let block = document.querySelector('span.fr');
    block.insertBefore(switchButton, block.firstChild);
    block.insertBefore(select, block.firstChild);

    // history-list.js 先加载：它决定可选季度，也提供 fallbacks 备用源清单。
    loadJSWithFallback(
        DATA_CDNS.map(c => c + REPO + '/history-list.js').concat(EDGEONE_CDN + 'history-list.js'),
        () => typeof history_list !== 'undefined' && Array.isArray(history_list.urls),
        function () {
            for (let i = 0; i < history_list.values.length; i++) {
                let option = createElementWithAttr('option', { 'value': history_list.values[i] }, history_list.names[i]);
                select.add(option);
            }
            let selectedIndex = history_list.urls.indexOf(localStorage.DataURL);
            if (selectedIndex === -1 && storedFile()) {
                // 存的不是列表里的主源 URL（多为旧版选过镜像），按文件名归位到对应季度。
                let f = storedFile();
                selectedIndex = history_list.urls.findIndex(u => u.endsWith('/' + f));
            }
            if (selectedIndex === -1) selectedIndex = 0;
            select.value = history_list.values[selectedIndex];

            let DataURL = history_list.urls[selectedIndex];
            let sources = [DataURL];
            // 仅当季数据享受多源容灾；历史季度为存档性质，保持单源。
            if (selectedIndex === 0 && history_list.fallbacks)
                sources = sources.concat(history_list.fallbacks);

            loadJSWithFallback(sources,
                () => typeof bangumi_data !== 'undefined' && Array.isArray(bangumi_data),
                function (finalURL) {
                    // 记住实际生效的源（可能是备用），下次刷新直接命中，省一次重试。
                    if (finalURL !== localStorage.DataURL) localStorage.DataURL = finalURL;
                    data2doms();
                    bangumiRefresh();
                });
        });
})();

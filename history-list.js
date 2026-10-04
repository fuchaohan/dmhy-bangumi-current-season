// 数据源下拉索引（values/names/urls 按下标一一对应）。
// 下拉框只列「当季 + 历史季度」，一个季度一项；镜像/备用源不在 UI 暴露，
// 而是收在 fallbacks 里，由脚本在主源加载失败时按序自动重试。
// 注意：EdgeOne 项目域名以控制台实际分配为准，若不同只需改 fallbacks 里那行 URL。
let history_list = {
    'values': ['default', '202301', '202210', '202207', '202204', '202201', '202110', '202107', '202104', '202101', '202010', '202007', '202004'],
    'names': ['2026年10月(当季)', '2023年01月', '2022年10月', '2022年07月', '2022年04月', '2022年01月', '2021年10月', '2021年07月', '2021年04月', '2021年01月', '2020年10月', '2020年07月', '2020年04月'],
    'urls': [
        'https://cdn.jsdelivr.net/gh/fuchaohan/dmhy-bangumi-current-season@master/bangumi-data.js',
        'https://cdn.jsdelivr.net/gh/fuchaohan/dmhy-bangumi-current-season@master/history-data/202301.js',
        'https://cdn.jsdelivr.net/gh/fuchaohan/dmhy-bangumi-current-season@master/history-data/202210.js',
        'https://cdn.jsdelivr.net/gh/fuchaohan/dmhy-bangumi-current-season@master/history-data/202207.js',
        'https://cdn.jsdelivr.net/gh/fuchaohan/dmhy-bangumi-current-season@master/history-data/202204.js',
        'https://cdn.jsdelivr.net/gh/fuchaohan/dmhy-bangumi-current-season@master/history-data/202201.js',
        'https://cdn.jsdelivr.net/gh/fuchaohan/dmhy-bangumi-current-season@master/history-data/202110.js',
        'https://cdn.jsdelivr.net/gh/fuchaohan/dmhy-bangumi-current-season@master/history-data/202107.js',
        'https://cdn.jsdelivr.net/gh/fuchaohan/dmhy-bangumi-current-season@master/history-data/202104.js',
        'https://cdn.jsdelivr.net/gh/fuchaohan/dmhy-bangumi-current-season@master/history-data/202101.js',
        'https://cdn.jsdelivr.net/gh/fuchaohan/dmhy-bangumi-current-season@master/history-data/202010.js',
        'https://cdn.jsdelivr.net/gh/fuchaohan/dmhy-bangumi-current-season@master/history-data/202007.js',
        'https://cdn.jsdelivr.net/gh/fuchaohan/dmhy-bangumi-current-season@master/history-data/202004.js'
    ],
    // 当季数据的备用源，主源失败时按序自动重试，用户无需手动切换。
    // 仅当季数据有备用；历史季度为存档性质，保持单源。
    'fallbacks': [
        'https://fastly.jsdelivr.net/gh/fuchaohan/dmhy-bangumi-current-season@master/bangumi-data.js',
        'https://gcore.jsdelivr.net/gh/fuchaohan/dmhy-bangumi-current-season@master/bangumi-data.js',
        'https://testingcf.jsdelivr.net/gh/fuchaohan/dmhy-bangumi-current-season@master/bangumi-data.js',
        'https://dmhy-bangumi-current-season.edgeone.app/bangumi-data.js'
    ]
};

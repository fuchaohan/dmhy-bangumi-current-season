// 数据源下拉索引（values/names/urls 按下标一一对应）。
// 主源 = cdn.jsdelivr.net；Fastly/Gcore/CF 为 jsDelivr 镜像热备；EdgeOne 为独立第二源。
// 注意：EdgeOne 项目域名以控制台实际分配为准，若不同只需改下方 default-edgeone 那行 URL。
let history_list = {
    'values': ['default', 'default-fastly', 'default-gcore', 'default-cf', 'default-edgeone', '202210', '202207', '202204', '202201', '202110', '202107', '202104', '202101', '202010', '202007', '202004'],
    'names': ['2023年01月(当季)', '2023年01月·Fastly镜像', '2023年01月·Gcore镜像', '2023年01月·CF镜像', '2023年01月·EdgeOne备用', '2022年10月', '2022年07月', '2022年04月', '2022年01月', '2021年10月', '2021年07月', '2021年04月', '2021年01月', '2020年10月', '2020年07月', '2020年04月'],
    'urls': [
        'https://cdn.jsdelivr.net/gh/fuchaohan/dmhy-bangumi-current-season@master/bangumi-data.js',
        'https://fastly.jsdelivr.net/gh/fuchaohan/dmhy-bangumi-current-season@master/bangumi-data.js',
        'https://gcore.jsdelivr.net/gh/fuchaohan/dmhy-bangumi-current-season@master/bangumi-data.js',
        'https://testingcf.jsdelivr.net/gh/fuchaohan/dmhy-bangumi-current-season@master/bangumi-data.js',
        'https://dmhy-bangumi-current-season.edgeone.app/bangumi-data.js',
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
    ]
};

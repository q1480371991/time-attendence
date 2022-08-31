import request from '@/utils/request.js'

export const report = function(reportid1, reporterid1) {
    return request.post('/report', {
        dara: JSON.stringify({
            reportid: reporterid1,
            reporterid: reporterid1
        }),
        headers: {
            'content-type': 'application/json'
        }
    })
}
import request from '@/utils/request.js'

export const getranktop = function(grade) {
    return request.get('/topthree', {
        params: {
            grade
        }
    })


}
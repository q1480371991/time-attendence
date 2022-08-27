import request from '@/utils/request.js'

export const loginorlogout = function(choice, studentid) {

    if (choice) {
        return request.get('/login', {
            params: {
                studentid
            }
        })
    } else {
        return request.get('/logout', {
            params: {
                studentid
            }
        })
    }
}
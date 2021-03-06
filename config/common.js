module.exports = {
	enableActivityLog: 1,
	ProjectRoot: __dirname.substring(0, __dirname.indexOf("\\routes") + '\logs'),
	isHTKPEnable: true,
	isHelmetEnable: true,
	helmetSettings: {
		contentSecurityPolicy: true,
		permittedCrossDomainPolicies: true,
		dnsPrefetchControl: true,
		expectCt: true,
		featurePolicy: true,
		frameguard: true,
		hidePoweredBy: true,
		hsts: true,
		ieNoOpen: true,
		noCache: true,
		noSniff: true,
		referrerPolicy: true,
		xssFilter: true
	},
	isDDOSEnable: true,
	DDOSSettings: {
        burst: 1,
        limit: 500,
		maxexpiry: 120,
        trustProxy: true,
        includeUserAgent: true,
        whitelist: [],
        errormessage: 'Too Many Requests!',
        testmode: false,
        responseStatus: 429
    },
	ENCSK:"LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlKSndJQkFBS0NBZ0IwSEsyK1RvKzlpbWlrTXdZVWN4VE9VTnU0U01xamozQnRGU0ZZa2NmeWRKLytCc3dRClNScnp5NUF1WjZkYXVFOTVTY2FGK0VIeTliOUJvSGU2bVd2SkhseDJQeFYvK0ZHOHhIZEVBdHRVaXMxN3dUTjcKU09JSmhKcm5MOS9yQzFOU0V4WjMvbC9aMWlRVjRTME1tWHdrTk5kQ0FpRTNUbGtBc1BqM1o4U0lpVXZJQmhzMwpESng1UzUzMHFyV3FvdkF4V282U2lybUFMa29jSzFlVkI0Z0ZJYVNzb3BsSzZpU3hnMW5tZ0w1TzczbUhDTWM5CmdZZ0dxNVJ5MXh6Y2tYUkZMeW5rZk9WM0UvTmo0SDFrZXZyalZoa1ZUMjd6ZFpxalZpWVZITFRhNERMYzk3Ky8KeUZQV3kxdWc0SU5wQVVBREcrMlRreGM3cytySWhjRGhMVUpPTzI1SC9zaEhlYzlhalhoZnc4M3VHTjVORmg2bwozYS9QNnJiWUN1WENyV3huZ2Nub1dnczR4TzdhY0R4ancvUnFIOC9TVTNVVEZ2L3NmNlQvY0t1SkhpaUp6d2lqClk0SlYvc3lPd3RuT04xbTBUYzdrL1RlVlc1bEFNYzk3NUJUanpncnV1TmtRa05TaEJ3RldLeHJZTXBsaE5FRkQKbzNSbzhIT0dNZGEyTkdtWG0veGNvd0tLRXZjRW5CeDJLQWVjYnA5ZmpQRVU5QnJSam14QmV1OXRLOEJCWkVsWgpuVm5PR1VZS1B6aDI5aVM0RUxwVGp0bldUczNIQ1ZZcnpjYWRmbUgwNHVsQUJnSElSeXFzKzU4ZmRxUDQrWGs2CnRPRHd0a0xpZVR6dy9zMTUycDFHUmZoeHBOYnFHMTZzODNzclhUSlBwS3lnbXYyR1I1NmFqL2dnUHdJREFRQUIKQW9JQ0FHbDd6RlBCWjFCWU4yeEVkbGVKblBNNS9nSlREdFM4Y1BTSVo3emc0M2JlZ0tMMFpkcTlyMkNnSkNJawpSS05rSWI4Y1NPQllnd0ZJUkRKSXA3eTd1SElEeFJnZmcxYTRydmtBdXlEc1AzbDBoK3pQdmdkWVZSRTBpTTFTCmJ1aEhaN0IrYXNFa05NdmZnUFRubGxlRjhJT3NCWXFRQ01FSHlrK1lkdlc4TFkya3ZWWEFSbVVpYmR5NzE0bjQKdEFXSzlRN0JLQmoxTWtUQ3lNMENpeFIydlJsOFVQQU0zNXB4VUZoNzdlWThPNmZXWXQ5TUdFVkdNZDl0YlBWUAplNGJlRlhUc3ZmQTNqdmM1QnJwTHJWN2xZcHU1RWh5TUIwM2lIMVFYNVl6MGdWRCtzUGFSbEgrVWJLWU1KUGZvClB6bmJ5dDJJTjdNRHcrMlhLOHB6eUtCSXo1eWp3SGRPVmlMM2tYL3FBNjNyVHhrSlV5ZklzWGloNUczZC9ybUkKWlJHT05Oei9wSG8rdHpoaGRaOUw0OVl2dGs0dUlDMkVhVE8rUEpMd28xaHU1My9XTUxtaGQzL1dCNko4QVNWMApLcnpWR0ZheXo2cE5JTU01REZUMmxBR01tR2ZyVVIyY2VMcU5tSkh0RFg0Vy9lRUlHdzJ2Y1VzUEFVYnIrREM0CkpRS21NZmZNeTFNRW1kbXRFczJnekhscE1ZeGdqc0poVk1oSVFTOFVKa1BLWWNvaXZuOXpOM090ZGpPZmNHTWkKWkc1VFFYVzZJZUdTemtNUTI5OFJ2QkhBeS8vYm9QZDRsdFlZc3FyVlBhNG5xeU5kV080ZlB3bzdheGpkbXZNaQowL2M2OTgvSTZpK3hnc2p1VE5IdlRDMi80WEc2eTdEZUxHWTY2bFBBYWQrcXR2RFJBb0lCQVFEZGFmMEpDZ1AyCldNTnhRRkRYcDdRNUF3YjRLZlZidzUvT2IycEsvZi9VWlRSU0VnM3BqdW95cGVOQi9ZcjRKY2NVY3VCZ0FOeTUKRVcvQk1CMGx4c0V1a3M1NzNLS1FMWFBSTDZQR0Rpa1NZTXI2a1RZT0ErY1c3c2djTW5BcnF1b3hWdHhQTnlZdQoxdTQ0RmQ5bG1KSnUzTVZ5QldlMmY2K3gyMVJsT3FkTjBqWnZaSFN0S0ovakdWdnNzMFZtZTZ6SU11cW0xUmdWCkxwMzU3TGU0R3ZYVXlLL1NNVlBnU2JoQzFKMVd0K01td0huUUs4bnVSaTRrRklNOFIxT0k2blZrdlFWc29mWGkKRVFIMm1iYUdubHY4ZTdiekFOVVVkUlRreHd6Tndodk04S0JzM3ZDSDg4ZkZGV2dZaHZxb1lXWmo0RDNWalc3YgpmUmM2K2dLY1BQdURBb0lCQVFDR1A5S3NzVU9pbTlxMm9Db3JrUTZLSEE3aC9GM0YwZkZ4bDdVaE1yS2tCdjBHCk5kenJacmVqUnhpZ1cwMXMxeGxzaHlDZ2R4ZXgybTJXR3pRSHUwSmFEK1hRZnpMQnE1M0ptZzU5UjlGOEF3MGEKV25ZVVVCNHhNc3cxdkxuWm5mVUZhbW1zalg3dUZObTdRVTd2c3NxRUV1eEtsN25WOFM1UVBHckxycGh0bkRacAorTjNvWmRZOW14cWZVaG1KNTBZWG9jQ3JTc0Q0Y0pnci85RmdGVWRjUzhxeTN4YnMwME8rWFVITG1kMldSamZKCmZUWDFrMUEvdGc2NTdYMUYvd1ptYjBsanNZcnVjSDlJWnpCUEc1a3NoTzNQSXNQUXg0dThmQU1Wdy9qQ0xRVUsKMytWM3hEVkNiWjVFeXNJYmtObGN4dUR5YjB3aWFVeFNPMnUwY2IrVkFvSUJBSFhRUjh2ZmdHdzhud0pMN3JoUgpqQndwK0ROa1lDSUwzYVRDdEJSalF4V0pKR1huSlcvNWs3U1BnSFZFckFXT1ZIZ1ZDRDhOTm1WaldjdTZCa2hyCmthOXVmbUI1N2lZNWlUN3Qwbjg0V2JKbHZwdkZXTFhzYmJKT0xEeVV1Z3NDVHNzaUpPZ2h1RGVFTmcyeDFjVUIKZ2lsclg4UmtDK09YM2EwTnY4SjlpemhsZW9HYk9scEpHNHFEbTk0L0pkWjZTRjNlZWUxN3hleS9lVi9iRFlieApFWTIvbTQ2RW9OVGZaU1JxYmE0Tyt0ZEw0NFZaUjRGNTVtTmNadGhVTzZiRzJ1QlhrK05SNnJ2M3dNdXV6dWlpCnF0K1dGS3NJN2xpTVZDbkhvSkI3a0w5ajZua0R4NGtQdG1Td0YwdTF4dnFCbVRIYnlBc3h6cU1MMUtpVkQzNkQKRkhFQ2dnRUFXOUJJY0F6bnVjMG5mcUQ1VmtSbGtqVHdSTVBKQ2lLMElzRGpncW5lbk9tZW9HRzBEbFo0bnpWZgpkVVFjSnFUUllYVGs3bm1rZmVGcDh5LzFuSmdJSC9vaGJUK2c0ZTFTQTIvV0d2NUVHYkVvZys1OE5SWTZIK0dpCjRkbUpyWGdtKzZZMFVXdVA5Sm5UOHdvT1IwYWExRXJ3eVc4TkRIRmZBRWJocngxZ2FBNWU5SWpja3pVYW1aVjcKVnB6YWxJTFVZQk1pNXNOQVNHa1EyWDZpbmpqUFRpTVRwTk9JSlQyelpmejNvNXcrZktqWFBIamlyMm9waHZrbgpCeWVSOW80Y3ZXKzgzRzZ2R3JWYmg1UHk2UmR4NFkyajZuYlhQdkZKOHdWSlF0aDlSNmRzZkd4MXpqd2xSS0lkCmpPU3liaEhaWm1jcHJ3UkpLSHVsVTlRSnJDWGpKUUtDQVFFQW5GZUZGbTJSNWhGSzNUeW1LZGNOeFVRUUlxQUwKT1VUMHdhTEhRdHhKUHBXT0ExbHVSRWtyYmtTMmVmcmFKYmlOWXNHcDJLYndiaE1Yd00rUzBCNVZKZ2w4a2Y1bwo2a2svSTlJNzJ3djhzTlRuWVlIb0dkN1hGVmlsYTY2bDBibjBOUnhBeE5hVDN4LzZiTUZCWm0zVHV3THQvSERxClVMQkFSQ25GSHVqV3ZKUEsxWXdQTHFhcGU0YmtHUHFrU2pzempZelE0TTFoN2RSVDZMOTVSU0hJVkw3VmhnWS8KQTlrYlQ4WnJQWEFSODJ1RkZvaHkzbXNjUkE0YWNwVVMrYjFOSk9aYnFzdm45am83VEwwSGtlYTVSVndobDAxbApYRnJKKzMvQkpsa1VvNzlJVTZUSmFzaDhzQ3ZCT2VLdTNjbnJ3eEE3cFpyT0tldHZRZkNxT2s2aE9nPT0KLS0tLS1FTkQgUlNBIFBSSVZBVEUgS0VZLS0tLS0=",
	ENCPK:"LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQ0lUQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FnNEFNSUlDQ1FLQ0FnQjBISzIrVG8rOWltaWtNd1lVY3hUTwpVTnU0U01xamozQnRGU0ZZa2NmeWRKLytCc3dRU1Jyenk1QXVaNmRhdUU5NVNjYUYrRUh5OWI5Qm9IZTZtV3ZKCkhseDJQeFYvK0ZHOHhIZEVBdHRVaXMxN3dUTjdTT0lKaEpybkw5L3JDMU5TRXhaMy9sL1oxaVFWNFMwTW1Yd2sKTk5kQ0FpRTNUbGtBc1BqM1o4U0lpVXZJQmhzM0RKeDVTNTMwcXJXcW92QXhXbzZTaXJtQUxrb2NLMWVWQjRnRgpJYVNzb3BsSzZpU3hnMW5tZ0w1TzczbUhDTWM5Z1lnR3E1UnkxeHpja1hSRkx5bmtmT1YzRS9OajRIMWtldnJqClZoa1ZUMjd6ZFpxalZpWVZITFRhNERMYzk3Ky95RlBXeTF1ZzRJTnBBVUFERysyVGt4YzdzK3JJaGNEaExVSk8KTzI1SC9zaEhlYzlhalhoZnc4M3VHTjVORmg2bzNhL1A2cmJZQ3VYQ3JXeG5nY25vV2dzNHhPN2FjRHhqdy9ScQpIOC9TVTNVVEZ2L3NmNlQvY0t1SkhpaUp6d2lqWTRKVi9zeU93dG5PTjFtMFRjN2svVGVWVzVsQU1jOTc1QlRqCnpncnV1TmtRa05TaEJ3RldLeHJZTXBsaE5FRkRvM1JvOEhPR01kYTJOR21YbS94Y293S0tFdmNFbkJ4MktBZWMKYnA5ZmpQRVU5QnJSam14QmV1OXRLOEJCWkVsWm5Wbk9HVVlLUHpoMjlpUzRFTHBUanRuV1RzM0hDVllyemNhZApmbUgwNHVsQUJnSElSeXFzKzU4ZmRxUDQrWGs2dE9Ed3RrTGllVHp3L3MxNTJwMUdSZmh4cE5icUcxNnM4M3NyClhUSlBwS3lnbXYyR1I1NmFqL2dnUHdJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0t"
};
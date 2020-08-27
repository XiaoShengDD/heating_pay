import request from "@/utils/request";

// 公告信息查询
export function announcementList() {
  return request({
    url: "/announcement/announcementList",
    method: "post",
  });
}



// 公告详细信息查询
export function announcementDetail(id) {
  return request({
    url: "/announcement/announcementDetail/" + id,
    method: "post",
  });
}

// 首页缴费信息查询
export function wxHouseholdSearch(data) {
  return request({
    url: "/heating/wxHouseholdSearch",
    method: "post",
    data: data
  });
}

// 查询个人信息
export function wxHouseholdInfo(id) {
  return request({
    url: "/heating/wxHouseholdInfo/" + id,
    method: "post",
  });
}


// 查询住户历史消费列表
export function wxOrderList(id) {
  return request({
    url: "/heating/wxOrderList/" + id,
    method: "post",
  });
}

// 查询缴费明细
export function wxOrderDeatil(id) {
  return request({
    url: "/heating/wxOrderDeatil/" + id,
    method: "post",
  });
}

// 微信授权 通过code换取openId等信息
export function wxLogin(code) {
  return request({
    url: "/heating/wxLogin/" + code,
    method: "post",
  });
}

// 生成订单并统一下单
export function subimtOrder(data) {
  return request({
    url: "/heating/subimtOrder",
    method: "post",
    data: data
  });
}

// 获取当前用户信息
export function wxHouseholdConfirmr(data) {
  return request({
    url: "/heating/wxHouseholdConfirm",
    method: "post",
    data: data
  });
}

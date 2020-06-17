// 封装接口请求的方法
import instance from "../utils/myhttp";

// 封装得到题库信息
export function apiGetQuestionList({
  title,
  subject,
  enterprise,
  type,
  step,
  username,
  status,
  difficulty,
  create_date,
  page,
  limit
}) {
  return instance({
    url: "/question/list",
    params: {
      title: title,
      subject: subject,
      enterprise: enterprise,
      type: type,
      step: step,
      username: username,
      status: status,
      difficulty: difficulty,
      create_date: create_date,
      page: page,
      limit: limit
    }
  });
}

// 封装添加题库的方法
export function apiAddQuestion(data) {
  return instance({
    url: "/question/add",
    method: "POST",
    data: data
  });
}

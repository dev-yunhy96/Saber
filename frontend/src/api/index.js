//import { courses, questions } from "./mock.json";
import mock from "./mock.json";
import kart from "./kart.json";
import track from "./track.json";
import character from "./character.json";
import gameType from "./gameType.json";
const { courses, questions, Ranker, Statics, matchdetail } = mock;

export function kartById(keywords) {
  const a = kart.filter(function (e) {
    return e.id === keywords;
  });
  if (a.length === 0) {
    return "알 수 없음";
  } else {
    return a[0].name;
  }
}
export function characterById(keywords) {
  const a = character.filter(function (e) {
    return e.id === keywords;
  });
  if (a.length === 0) {
    return "알 수 없음";
  } else {
    return a[0].name;
  }
}
export function trackById(keywords) {
  const a = track.filter(function (e) {
    return e.id === keywords;
  });
  if (a.length === 0) {
    return "알 수 없음";
  } else {
    return a[0].name;
  }

  // return track.filter(function (e) {
  //   return e.id === keywords;
  // })[0].name;
}

export function gameTypeById(keywords) {
  return gameType.filter(function (e) {
    return e.id === keywords;
  })[0].name;
}

function filterByKeyword(items, keyword) {
  const lowered = keyword.toLowerCase();
  return items.filter(({ title }) => title.toLowerCase().includes(lowered));
}
export function getMatch(keyword) {
  return matchdetail;
}
export function getRanker() {
  return Ranker;
}

export function getStaticsspeed(keyword) {
  return Statics.speed;
}

export function getStaticsitem(keyword) {
  return Statics.item;
}

export function getCourses(keyword) {
  if (!keyword) return courses;
  return filterByKeyword(courses, keyword);
}

export function getCourseBySlug(courseSlug) {
  return courses.find((course) => course.slug === courseSlug);
}

export function getQuestions(keyword) {
  if (!keyword) return questions;
  return filterByKeyword(questions, keyword);
}

export function getQuestionById(questionId) {
  return questions.find((question) => question.id === questionId);
}

const WISHLIST_KEY = "codethat-wishlist";
const wishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY) || "{}");

export function addWishlist(courseSlug) {
  wishlist[courseSlug] = true;
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
}

export function deleteWishlist(courseSlug) {
  delete wishlist[courseSlug];
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
}

export function getWishlist() {
  return courses.filter((course) => wishlist[course.slug]);
}

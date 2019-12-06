const request = require("request");
const cheerio = require("cheerio");
const list = {};
request(
  "https://summerofcode.withgoogle.com/archive/2017/organizations",
  (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      $(".organization-card__name").each((i, el) => {
        const orgName = $(el).text();
        if (orgName in list) {
          list[orgName][2017] = 1;
        } else {
          list[orgName] = { 2017: 1 };
        }
      });
    }
  }
);

request(
  "https://summerofcode.withgoogle.com/archive/2018/organizations",
  (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      $(".organization-card__name").each((i, el) => {
        const orgName = $(el).text();
        if (orgName in list) {
          list[orgName][2018] = 1;
        } else {
          list[orgName] = { 2018: 1 };
        }
      });
    }
  }
);

request(
  "https://summerofcode.withgoogle.com/archive/2019/organizations",
  (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      $(".organization-card__name").each((i, el) => {
        const orgName = $(el).text();
        list[orgName] = { 2019: 1 };
      });
    }
  }
);

const allThree = [];
setTimeout(function afterTwoSeconds() {
  const totalOrganizations = Object.entries(list);
  for (const [name, years] of totalOrganizations) {
    const available = Object.keys(years);

    if (available.length === 3) {
      allThree.push(name);
    }
  }

  for (const name of allThree) {
    console.log(name);
  }
}, 10000);

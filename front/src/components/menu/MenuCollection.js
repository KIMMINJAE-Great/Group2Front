export function MenuCollection() {

  const user = JSON.parse(sessionStorage.getItem('user'));

  const mauthList = user.mauthList;

  let sections = [];

  mauthList.forEach((item) => {

    // sctions에서 메뉴 그룹이름을 가진 section을 찾는다.
    let section = sections.find(sec => sec.title === item.mgroupnm);

    // 해당 그룹이름을 가딘 sction이 없다면 새로 생성한다.
    if (!section) {
      section = {
        title: item.mgroupnm,
        subItems: [],
        url: [],
        menucd: []
      };
      sections.push(section);
    }

    // url, menu_cd, menu_nm 을 section에 push  
    section.subItems.push(item.menunm);
    section.url.push(item.url); // url을 쓴 이유 : 필요없다고는 생각이 들지만 명시용으로 저장
    section.menucd.push(item.menucd);
  });


  return sections;
}
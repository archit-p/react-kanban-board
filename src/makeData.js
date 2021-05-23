import faker from 'faker';

export function makeData(count) {
  let items = [];
  for (let i = 0; i < count; i++) {
    items.push({
      id: faker.datatype.uuid(),
      content: faker.lorem.words(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      avatar: faker.internet.avatar(),
      company: faker.company.companyName(),
    });
  }
  console.log(items);
  return items;
}

// import DataLoader from 'dataloader';
//
// export const createLoaders = () => {
//   return {
//     users: new DataLoader((ids) => genUsers(authToken, ids)),
//     cdnUrls: new DataLoader((rawUrls) =>
//       genCdnUrls(authToken, rawUrls),
//     ),
//     stories: new DataLoader((keys) => genStories(authToken, keys)),
//   };
// };
//
// function createUsersLoader(usersService: UsersService) {
//   return new DataLoader<number, User>(async (ids) => {
//     const users = await usersService.getUsersByIds(ids);
//
//     const usersMap = mapFromArray(users, (user) => user.id);
//
//     return ids.map((id) => usersMap[id]);
//   });
// }

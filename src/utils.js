module.exports.paginateList = ({ cursor = null, pageSize = 3, list }) => {
  if (pageSize < 1) return [];

  if (!cursor) return list.slice(0, pageSize);

  const cursorIndex = list.findIndex((item) => {
    let itemCursor = item._id && item._id.toString(); // stringify mongodb _id (object type)

    return itemCursor ? cursor === itemCursor : false;
  });

  return cursorIndex >= 0
    ? cursorIndex === list.length - 1 // list ended already
      ? []
      : list.slice(
          cursorIndex + 1,
          Math.min(list.length, cursorIndex + 1 + pageSize)
        )
    : list.slice(0, pageSize); // curser not found in list items
};

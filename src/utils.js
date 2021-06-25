module.exports.paginateList = ({ cursor, pageSize, first, list }) => {
  if (pageSize < 1 || first < 1) return [];

  if (first || !cursor) return list.slice(0, first || pageSize); // return first num of elements

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

const db = {}

export default {
  deleteEdge: id => db.prepare('DELETE FROM edges WHERE source = ? OR target = ?').bind(id),
  deleteNode: id => db.prepare('DELETE FROM nodes WHERE id = ?').bind(id),
  insertEdge: (source, target, obj) => db.prepare('INSERT INTO edges VALUES(?, ?, json(?))').bind(source, target, obj),
  insertNode: (obj) => db.prepare('INSERT INTO nodes VALUES(json(?))').bind(obj),
}

const db = {}

export default {
  deleteEdge: id => db.prepare('DELETE FROM edges WHERE source = ? OR target = ?').bind(id),
  deleteNode: id => db.prepare('DELETE FROM nodes WHERE id = ?').bind(id),
  insertEdge: (source, target, obj) => db.prepare('INSERT INTO edges VALUES(?, ?, json(?))').bind(source, target, obj),
  insertNode: (obj) => db.prepare('INSERT INTO nodes VALUES(json(?))').bind(obj),
  searchEdgesInbound: id => db.prepare('SELECT * FROM edges WHERE source = ?').bind(id),
  searchEdgesOutbound: id => db.prepare('SELECT * FROM edges WHERE target = ?').bind(id),
  searchEdges: id => db.prepare('SELECT * FROM edges WHERE source = ? UNION SELECT * FROM edges WHERE target = ?').bind(id),
}

const db = {}

export default {
  deleteEdge: id => db.prepare('DELETE FROM edges WHERE source = ? OR target = ?').bind(id),
  deleteNode: id => db.prepare('DELETE FROM nodes WHERE id = ?').bind(id),
  insertEdge: (source, target, obj) => db.prepare('INSERT INTO edges VALUES(?, ?, json(?))').bind(source, target, obj),
  insertNode: (obj) => db.prepare('INSERT INTO nodes VALUES(json(?))').bind(obj),
  searchEdgesInbound: id => db.prepare('SELECT * FROM edges WHERE source = ?').bind(id),
  searchEdgesOutbound: id => db.prepare('SELECT * FROM edges WHERE target = ?').bind(id),
  searchEdges: id => db.prepare('SELECT * FROM edges WHERE source = ? UNION SELECT * FROM edges WHERE target = ?').bind(id),
  searchNodeById: id => db.prepare('SELECT body FROM nodes WHERE id = ?').bind(id),
  traverseInbound: id => db.prepare('WITH RECURSIVE traverse(id) AS (SELECT :source UNION SELECT source FROM edges JOIN traverse ON target = id) SELECT id FROM traverse;').bind(id),
  traverseOutbound: id => db.prepare('WITH RECURSIVE traverse(id) AS (SELECT :source UNION SELECT target FROM edges JOIN traverse ON source = id) SELECT id FROM traverse;').bind(id),
  traverseWithBodiesInbound: (x, y, obj) => db.prepare(`WITH RECURSIVE traverse(x, y, obj) AS (SELECT :source, '()', '{}' UNION SELECT id, '()', body FROM nodes JOIN traverse ON id = x UNION SELECT source, '<-', properties FROM edges JOIN traverse ON target = x) SELECT x, y, obj FROM traverse;`).bind(x, y, obj),
  traverseWithBodiesOutbound: (x, y, obj) => db.prepare(`WITH RECURSIVE traverse(x, y, obj) AS (SELECT :source, '()', '{}' UNION SELECT id, '()', body FROM nodes JOIN traverse ON id = x UNION SELECT target, '->', properties FROM edges JOIN traverse ON source = x) SELECT x, y, obj FROM traverse;`).bind(x, y, obj),
  traverseWithBodies: (x, y, obj) => db.prepare(`WITH RECURSIVE traverse(x, y, obj) AS (SELECT :source, '()', '{}' UNION SELECT id, '()', body FROM nodes JOIN traverse ON id = x UNION SELECT source, '<-', properties FROM edges JOIN traverse ON target = x UNION SELECT target, '->', properties FROM edges JOIN traverse ON source = x) SELECT x, y, obj FROM traverse;`).bind(x, y, obj),
  traverseInbound: id => db.prepare('WITH RECURSIVE traverse(id) AS (SELECT :source UNION SELECT source FROM edges JOIN traverse ON target = id UNION SELECT target FROM edges JOIN traverse ON source = id) SELECT id FROM traverse;').bind(id),
}

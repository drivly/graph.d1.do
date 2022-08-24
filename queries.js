const db = {}

export default {
  deleteEdge: id => db.prepare('DELETE FROM edges WHERE source = ? OR target = ?').bind(id),
  deleteNode: id => db.prepare('DELETE FROM nodes WHERE id = ?').bind(id),
}

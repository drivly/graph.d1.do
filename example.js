export default {
 nodes: {
        1:   {'name': 'Apple Computer Company', 'type': ['company', 'start-up'], 'founded': 'April 1, 1976'},
        2:   {'name': 'Steve Wozniak', 'type': ['person', 'engineer', 'founder']},
        3:   {'name': 'Steve Jobs', 'type': ['person', 'designer', 'founder']},
        4:   {'name': 'Ronald Wayne', 'type': ['person', 'administrator', 'founder']},
        5:   {'name': 'Mike Markkula', 'type': ['person', 'investor']}
  },
  edges: {
        1:   [(4, {'action': 'divested', 'amount': 800, 'date': 'April 12, 1976'})],
        2:   [(1, {'action': 'founded'}), ('3', None)],
        3:   [(1, {'action': 'founded'})],
        4:   [(1, {'action': 'founded'})],
        5:   [(1, {'action': 'invested', 'equity': 80000, 'debt': 170000})]
  },
}

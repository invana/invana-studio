from gremlin_python.driver.driver_remote_connection import DriverRemoteConnection
from gremlin_python.process.anonymous_traversal import traversal

g = traversal().withRemote(DriverRemoteConnection('ws://localhost:8182/gremlin', 'g'))


def create_vertex():
    g.addV('Person').property('name', 'person {}'.format(i)).property('age', 29).iterate()


for i in range(0, 200):
    create_vertex(i)

import time
from sqlalchemy import create_engine
from sqlalchemy.exc import OperationalError
import os
from sqlalchemy.orm import Session
from models import Base, Person, Dataset, Relation, Session as SessionSchema,Job,Settings

def wait_for_db(database_url,retries=10,retry_delay=5):
    print(f"Attempting to connect to database at: {database_url}",flush=True) 
    engine = create_engine(database_url)

    attempts = 0
    while attempts < retries:
        try:
            conn = engine.connect()
            print("Database is ready!",flush=True)
            conn.close()
            return engine
        except OperationalError:
            print("Waiting for database...",flush=True)
            attempts+=1
            time.sleep(retry_delay)

    raise Exception("Failed to connect to the database...")

def seed_data(eng):
    # Your data seeding logic here
    with Session(eng) as session:
        # Create the table.
        Base.metadata.create_all(engine)

        # Check is DB is seeded or not.
        isAlreadySeeded = session.query(Settings).filter(Settings.key == 'seeded').first()
        if((isAlreadySeeded is None) or (isAlreadySeeded.value != 'true')):

            # populate it
            alice = Person(
                    firstName="alice",
                    lastName='adlington'
                    )
            bob = Person(
                    firstName="bob",
                    lastName="bobington",
                    age=30
                    )
            charlie = Person(
                    firstName="charlie",
                    lastName="charleston",
                    age=25
                    )
            
            
            dataset1 = Dataset(
                name="Sample Multigraph",
                description="A sample multigraph with 5 nodes and 6 edges, in which each node is randomly connected to one or many neighbours.",
                isDirected=True,
                isMultigraph=True
            )
            n1 = Relation(
                dataset=dataset1,
                source="a",
                target="b"
            )
            n2 = Relation(
                dataset=dataset1,
                source="a",
                target="c"
            )
            n3 = Relation(
                dataset=dataset1,
                source="a",
                target="d"
            )
            n4 = Relation(
                dataset=dataset1,
                source="d",
                target="e"
            )
            n5 = Relation(
                dataset=dataset1,
                source="c",
                target="e"
            )
            n6 = Relation(
                dataset=dataset1,
                source="b",
                target="e"
            )

            dataset2 = Dataset(
                name="Sample Disconnected Graph",
                description="A small example of a graph in which there may be mutliple nodes and edges where groups may be disconnected from the whole. Includes a reciprocal edge between f and e",
                isDirected=True,
                isMultigraph=True
            )
            nn1 = Relation(
                dataset=dataset2,
                source="a",
                target="b"
            )
            nn2 = Relation(
                dataset=dataset2,
                source="b",
                target="c"
            )
            nn3 = Relation(
                dataset=dataset2,
                source="c",
                target="a"
            )
            nn4 = Relation(
                dataset=dataset2,
                source="d",
                target="e"
            )
            nn5 = Relation(
                dataset=dataset2,
                source="e",
                target="f"
            )
            nn6 = Relation(
                dataset=dataset2,
                source="f",
                target="d"
            )
            nn7 = Relation(
                dataset=dataset2,
                source="f",
                target="e"
            )
            dataset3 = Dataset(
                name="Sample Linear Graph",
                description="A small example of a graph where each node has only one relation to another node.",
                isDirected=True,
                isMultigraph=False
            )
            nnn1 = Relation(
                dataset=dataset3,
                source="a",
                target="b"
            )
            nnn2 = Relation(
                dataset=dataset3,
                source="b",
                target="c"
            )
            nnn3 = Relation(
                dataset=dataset3,
                source="c",
                target="d"
            )


            session1 = SessionSchema(
                name="Test Session A",
                dataset=dataset1
            )

            job1 = Job(
                name="Job 1",
                description='test Job 1',
                session=session1
            )
            job2 = Job(
                name="Job 2",
                description='test Job 2',
                session=session1
            )

            isSeeded = Settings(
                key='seeded',
                value='true'
            )


            session.add_all([alice,bob,charlie])
            # session.add_all([dataset1,n1,n2,n3,n4,n5,n6,\
            #                  dataset2,nn1,nn2,nn3,nn4,nn5,nn6,nn7,\
            #                  dataset3,nnn1,nnn2,nnn3
            #                  ])

            session.add_all([dataset1,n1,n2,n3,n4,n5,n6])
            session.commit()
            session.add_all([dataset2,nn1,nn2,nn3,nn4,nn5,nn6,nn7])
            session.commit()
            session.add_all([dataset3,nnn1,nnn2,nnn3])
            session.commit()
            session.add_all([session1,job1,job2])

            session.add(isSeeded)
            session.commit()


if __name__ == "__main__":
    print("Starting Seed...",flush=True)
    database_url = os.getenv("DATABASE_URL",None)
    if not database_url:
        raise ValueError("DATABASE_URL is not set or is empty.")
    
    engine = wait_for_db(database_url)
    seed_data(engine)
    print("Finished Seeding DB.")


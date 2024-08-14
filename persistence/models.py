from sqlalchemy.orm import Mapped,mapped_column,declarative_base,relationship
from sqlalchemy import ForeignKey


Base = declarative_base()

class Settings(Base):
    __tablename__ = 'app_settings'
    id : Mapped[int] = mapped_column(primary_key=True,autoincrement=True,unique=True)
    key : Mapped[str] = mapped_column(index=True,nullable=False,unique=True)
    value: Mapped[str] = mapped_column(nullable=False)

class Person(Base):
    __tablename__ = 'test_people'
    id : Mapped[int] = mapped_column(primary_key=True,autoincrement=True,index=True,unique=True)
    firstName : Mapped[str]
    lastName : Mapped[str]
    age :Mapped[int] = mapped_column(nullable=True)


class Dataset(Base):
    __tablename__ = 'datasets'
    datasetId : Mapped[int] = mapped_column(primary_key=True,autoincrement=True,index=True,unique=True)
    name : Mapped[str]= mapped_column(nullable=False)
    description : Mapped[str]= mapped_column(nullable=False)
    totalNodes : Mapped[int]= mapped_column(default=0)
    isDirected: Mapped[bool] = mapped_column(nullable=False)
    isMultigraph: Mapped[bool] = mapped_column(nullable=False)
    
    relations = relationship("Relation", back_populates="dataset")
    sessions = relationship("Session", back_populates="dataset")

    def __repr__(self) -> str:
        return f"Dataset(id={self.id!r})"

class Relation(Base):
    __tablename__ = 'relations'
    datasetId : Mapped[int] = mapped_column(ForeignKey('datasets.datasetId'),primary_key=True,nullable=False)
    target : Mapped[str]= mapped_column(primary_key=True,nullable=False)
    source : Mapped[str]= mapped_column(primary_key=True,nullable=False)

    dataset = relationship("Dataset", back_populates="relations")

    def __repr__(self) -> str:
        return f"Relation({self.source} -> {self.target})"
    
class Session(Base):
    __tablename__ = 'sessions'
    sessionId : Mapped[int] = mapped_column(primary_key=True,autoincrement=True,index=True,unique=True)
    datasetId : Mapped[int] = mapped_column(ForeignKey('datasets.datasetId'))
    name : Mapped[str]= mapped_column(nullable=False)

    #TODO: Need to reference a model, and it's configuration...
    jobs = relationship("Job", back_populates="session")
    dataset = relationship("Dataset", back_populates="sessions")

    def __repr__(self) -> str:
        return f"Session(id={self.sessionId!r})"
    
class Job(Base):
    __tablename__ = 'jobs'
    id : Mapped[int] = mapped_column(primary_key=True,autoincrement=True,index=True,unique=True)
    name : Mapped[str]= mapped_column(nullable=False)
    description : Mapped[str]= mapped_column(nullable=False)
    running : Mapped[bool] = mapped_column(default=False)
    completed : Mapped[bool] = mapped_column(default=False)
    sessionId : Mapped[int] = mapped_column(ForeignKey('sessions.sessionId'))

    
    session = relationship("Session", back_populates="jobs")

    def __repr__(self) -> str:
        return f"Job(id={self.id!r}, isRunning:{self.running}, isFinished:{self.completed})"
    



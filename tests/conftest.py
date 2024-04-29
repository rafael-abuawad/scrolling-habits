import pytest


@pytest.fixture(scope="module")
def sender(accounts):
    return accounts[0]


@pytest.fixture(scope="module")
def user(accounts):
    return accounts[1]


@pytest.fixture(scope="module")
def scrolling_habit(project, sender):
    return project.ScrollingHabit.deploy(sender=sender)

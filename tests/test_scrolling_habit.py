import random

GENESIS_TIME_STAMP = 1714008197
DELAY = 86400


def test_scrolling_habit_name(scrolling_habit):
    assert scrolling_habit.name() == "Scrolling Habit"


def test_scrolling_habit_symbol(scrolling_habit):
    assert scrolling_habit.symbol() == "SCROLLHABIT"


def test_scrolling_habit_deployer_is_owner(scrolling_habit, sender):
    assert scrolling_habit.owner() == sender


def test_mint_checkbox_habit(scrolling_habit, user):
    id = 0
    title = "Do excercise"

    scrolling_habit.safeMint(title, sender=user)
    habit = scrolling_habit.getHabit(id, sender=user)

    assert scrolling_habit.balanceOf(user) == 1
    assert scrolling_habit.ownerOf(id) == user
    assert habit.title == title
    assert habit.metric == ""
    assert habit.entries == 0


def test_checkbox_habit_new_entry(scrolling_habit, user):
    id = 0
    title = "Do excercise"

    scrolling_habit.safeMint(title, sender=user)
    habit = scrolling_habit.getHabit(id, sender=user)

    assert scrolling_habit.balanceOf(user) == 1
    assert habit.entries == 0

    scrolling_habit.entry(id, sender=user)
    habit = scrolling_habit.getHabit(id, sender=user)
    assert habit.entries == 1


def test_mint_numeric_habit(scrolling_habit, user):
    id = 0
    title = "Complete push-ups"
    metric = "push-ups"

    scrolling_habit.safeMint(title, metric, sender=user)
    habit = scrolling_habit.getHabit(id, sender=user)

    assert scrolling_habit.ownerOf(id) == user
    assert habit.title == title
    assert habit.metric == metric
    assert habit.entries == 0


def test_numeric_habit_new_entry(scrolling_habit, user):
    id = 0
    title = "Complete push-ups"
    metric = "push-ups"
    entries = 100

    scrolling_habit.safeMint(title, metric, sender=user)
    habit = scrolling_habit.getHabit(id, sender=user)
    assert habit.entries == 0

    scrolling_habit.entry(id, entries, sender=user)
    habit = scrolling_habit.getHabit(id, sender=user)
    assert habit.entries == entries


def test_multiple_habits_mint(scrolling_habit, user):
    ids = [0, 1, 2, 3]
    for id in ids:
        title = f"Demo {id}"
        metrics = "demos"
        should_be_checkbox = id % 2 == 0

        if should_be_checkbox:
            scrolling_habit.safeMint(title, sender=user)
        else:
            scrolling_habit.safeMint(title, metrics, sender=user)

    assert scrolling_habit.balanceOf(user) == len(ids)

    for id in ids:
        title = f"Demo {id}"
        habit = scrolling_habit.getHabit(id, sender=user)
        should_be_checkbox = id % 2 == 0

        if should_be_checkbox:
            assert habit.metric == ""
        else:
            assert habit.metric == "demos"

        assert habit.title == title
        assert habit.entries == 0


def test_multiple_habits_entries(scrolling_habit, user):
    ids = [0, 1, 2, 3]
    for id in ids:
        title = f"Demo {id}"
        metrics = "demos"
        should_be_checkbox = id % 2 == 0

        if should_be_checkbox:
            scrolling_habit.safeMint(title, sender=user)
        else:
            scrolling_habit.safeMint(title, metrics, sender=user)

    amounts_to_id = {}
    for id in ids:
        should_be_checkbox = id % 2 == 0
        if should_be_checkbox:
            scrolling_habit.entry(id, sender=user)
        else:
            amounts_to_id[id] = random.randint(1, 100)
            scrolling_habit.entry(id, amounts_to_id[id], sender=user)

    for id in ids:
        habit = scrolling_habit.getHabit(id, sender=user)
        should_be_checkbox = id % 2 == 0

        if not should_be_checkbox:
            assert habit.entries == amounts_to_id[id]
        else:
            assert habit.entries == 1


def test_get_habits(scrolling_habit, user):
    ids = [0, 1, 2, 3]
    for id in ids:
        title = f"Demo {id}"
        metrics = "demos"
        should_be_checkbox = id % 2 == 0

        if should_be_checkbox:
            scrolling_habit.safeMint(title, sender=user)
        else:
            scrolling_habit.safeMint(title, metrics, sender=user)

    habits = []
    for id in ids:
        habits.append(scrolling_habit.getHabit(id, sender=user))

    scrolling_habit_list = scrolling_habit.getHabits(sender=user)
    assert len(habits) == len(scrolling_habit_list)

    # compare habits one by one
    for i in range(len(habits)):
        assert habits[i].title == scrolling_habit_list[i].title
        assert habits[i].entries == scrolling_habit_list[i].entries
        assert habits[i].metric == scrolling_habit_list[i].metric

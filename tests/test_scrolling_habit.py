import ape
import random

DELAY = 86400

current_time_stamp = 1714096330


def mine_block():
    global current_time_stamp
    current_time_stamp += DELAY
    ape.chain.provider.set_timestamp(current_time_stamp)
    ape.chain.provider.mine()


def test_scrolling_habit_name(scrolling_habit):
    assert scrolling_habit.name() == "Scrolling Habit"


def test_scrolling_habit_symbol(scrolling_habit):
    assert scrolling_habit.symbol() == "SCROLLHABIT"


def test_scrolling_habit_deployer_is_owner(scrolling_habit, sender):
    assert scrolling_habit.owner() == sender


def test_mint_simple_habit(scrolling_habit, user):
    id = 0
    title = "Do excercise"

    scrolling_habit.safeMint(title, sender=user)
    habit = scrolling_habit.getHabit(id, sender=user)
    entries = scrolling_habit.getEntries(id, sender=user)

    assert scrolling_habit.balanceOf(user) == 1
    assert scrolling_habit.ownerOf(id) == user
    assert habit.title == title
    assert habit.metric == ""
    assert len(entries) == 0


def test_simple_habit_new_entry(scrolling_habit, user):
    id = 0
    title = "Do excercise"

    scrolling_habit.safeMint(title, sender=user)
    entries = scrolling_habit.getEntries(id, sender=user)

    assert scrolling_habit.balanceOf(user) == 1
    assert len(entries) == 0

    scrolling_habit.entry(id, sender=user)
    entries = scrolling_habit.getEntries(id, sender=user)
    assert len(entries) == 1
    assert entries[0].amount == 1


def text_mint_complex_habit(scrolling_habit, user):
    id = 0
    title = "Complete push-ups"
    metric = "push-ups"

    scrolling_habit.safeMint(title, metric, sender=user)
    habit = scrolling_habit.getHabit(id, sender=user)

    assert scrolling_habit.ownerOf(id) == user
    assert habit.title == title
    assert habit.metric == metric


def text_complex_habit_new_entry(scrolling_habit, user):
    id = 0
    title = "Complete push-ups"
    metric = "push-ups"
    amount = 100

    scrolling_habit.safeMint(title, metric, sender=user)
    entries = scrolling_habit.getEntries(id, sender=user)

    assert scrolling_habit.balanceOf(user) == 1
    assert len(entries) == 0

    scrolling_habit.entry(id, amount, sender=user)
    entries = scrolling_habit.getEntries(id, sender=user)
    assert len(entries) == 1
    assert entries[0].amount == amount


def text_simple_habit_with_complex_entry_reverts(scrolling_habit, user):
    id = 0
    title = "Do excercise"
    amount = 100

    scrolling_habit.safeMint(title, sender=user)
    entries = scrolling_habit.getEntries(id, sender=user)

    assert scrolling_habit.balanceOf(user) == 1
    assert len(entries) == 0

    with ape.reverts():
        scrolling_habit.entry(id, amount, sender=user)


def test_multiple_habits_mint(scrolling_habit, user):
    ids = [0, 1, 2, 3]
    for id in ids:
        title = f"Demo {id}"
        metrics = "demos"
        is_simple = id % 2 == 0

        if is_simple:
            scrolling_habit.safeMint(title, sender=user)
        else:
            scrolling_habit.safeMint(title, metrics, sender=user)

    for id in ids:
        title = f"Demo {id}"
        habit = scrolling_habit.getHabit(id, sender=user)
        is_simple = id % 2 == 0

        if is_simple:
            assert habit.metric == ""
        else:
            assert habit.metric == "demos"

        assert habit.title == title
        entries = scrolling_habit.getEntries(id, sender=user)
        assert len(entries) == 0

    assert scrolling_habit.balanceOf(user) == len(ids)


def test_multiple_habits_one_entries(scrolling_habit, user):
    for id in range(10):
        is_simple = id % 2 == 0
        if is_simple:
            scrolling_habit.safeMint("", sender=user)
        else:
            scrolling_habit.safeMint("", "-", sender=user)

    amount_to_id = {}
    for id in range(10):
        is_simple = id % 2 == 0
        if is_simple:
            scrolling_habit.entry(id, sender=user)
            amount_to_id[id] = 1
        else:
            amount_to_id[id] = random.randint(1, 100)
            scrolling_habit.entry(id, amount_to_id[id], sender=user)

    for id in range(10):
        entries = scrolling_habit.getEntries(id, sender=user)
        entry = entries[0]
        assert len(entries) == 1
        assert entry.amount == amount_to_id[id]


def test_multiple_habits_with_multiple_entries(scrolling_habit, user):
    for id in range(10):
        is_simple = id % 2 == 0
        if is_simple:
            scrolling_habit.safeMint("", sender=user)
        else:
            scrolling_habit.safeMint("", "-", sender=user)

    amount_to_id = {}
    for id in range(10):
        is_simple = id % 2 == 0
        if id not in amount_to_id:
            amount_to_id[id] = []

        for _ in range(random.randint(0, 30)):
            mine_block()
            if is_simple:
                scrolling_habit.entry(id, sender=user)
                amount_to_id[id].append(1)
            else:
                value = random.randint(1, 100)
                amount_to_id[id].append(value)
                scrolling_habit.entry(id, value, sender=user)

    for id in range(10):
        entries = scrolling_habit.getEntries(id, sender=user)
        for i in range(len(entries)):
            entry = entries[i]
            assert entry.amount == amount_to_id[id][i]


def test_get_habits(scrolling_habit, user):
    for id in range(10):
        is_simple = id % 2 == 0
        if is_simple:
            scrolling_habit.safeMint("", sender=user)
        else:
            scrolling_habit.safeMint("", "-", sender=user)

    habits = []
    for id in range(10):
        habits.append(scrolling_habit.getHabit(id, sender=user))

    scrolling_habit_list = scrolling_habit.getHabits(sender=user)
    assert len(habits) == len(scrolling_habit_list)

    for id in range(len(habits)):
        assert habits[id].title == scrolling_habit_list[id].title
        assert habits[id].metric == scrolling_habit_list[id].metric

from ape import accounts, project, chain

ANVIL_CHAIN_ID = 31337

def main():
    deployer = accounts.load("deployer")
    if chain.chain_id == ANVIL_CHAIN_ID:
        deployer.balance = "10 ETH"
    
    scrolling_habits = project.ScrollingHabit.deploy(deployer, sender=deployer)
    return scrolling_habits
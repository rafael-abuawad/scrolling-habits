**Scrolling Habits**
=====================

**Live Demo**

Try out Scrolling Habits live at [here](https://scrollinghabits-q4lu27kmj-rafaelabuawads-projects.vercel.app/).

**Smart Contract**

View the deployed smart contract on *ScrollScan* at [0x9c2eeac55433e3510581A070e253165a6D3864Bc](https://sepolia.scrollscan.com/address/0x9c2eeac55433e3510581A070e253165a6D3864Bc#code).

**Decentralized Habit Tracking on the Scroll Sepolia Testnet**

Scrolling Habits is an open-source, decen tralized application (dApp) that allows users to privately create and track habits completely on-chain. Built on the Scroll Sepolia Testnet, our dApp utilizes a simple ERC721 smart contract to provide a secure and transparent way to manage your habits.

**Key Features**

* **Private Habit Tracking**: Only the owner of a habit can view their own habits, ensuring complete privacy and security.
* **Simple and Complex Habits**: Create both simple habits (e.g., waking up at 7 am every day) and complex habits (e.g., tracking kilometers ran or hours practiced) with customizable metrics.
* **Immutable Entries**: Each habit has entries, consisting of a date and a value (1 for simple habits), stored on-chain forever, allowing users to track their progress over time.

**How it Works**

1. Users create habits, specifying whether they are simple or complex.
2. For complex habits, users define the metrics to track (e.g., kilometers, hours).
3. Users create entries for their habits, which are stored on-chain.
4. Only the owner of a habit can view their own habits and entries.

**Technical Details**

* Built on the Scroll Sepolia Testnet
* Utilizes a simple ERC721 smart contract for habit management
* Habit data is stored on-chain, ensuring immutability and transparency

**Dependencies**

```
git clone https://github.com/rafael-abuawad/scrolling-habits.git
cd scrolling-habits
pip install -r requirements.txt
ape plugins install .
ape test
ape run scripts/deploy.py --network ::foundry
```

**Getting Started**

To start using Scrolling Habits, follow these steps:

1. Install the necessary dependencies (listed above).
2. Deploy the smart contract to the Scroll Sepolia Testnet.
3. Interact with the dApp using a compatible wallet and browser.

**Contributing**

Scrolling Habits is an open-source project built for the [V0rtex 01 Hackathon](https://dorahacks.io/hackathon/v0rtex-01/buidl), and I welcome contributions from the community. If you're interested in helping us improve the dApp, please fork the repository and submit a pull request.

**License**

Scrolling Habits is licensed under the Apache 2.0 License.

**Contact**

If you have any questions or need help with Scrolling Habits, please reach out to me on 𝕏 at [@rabuawad_](https://twitter.com/rabuawad_).

I hope this is what you were looking for! Let me know if you need any further modifications.
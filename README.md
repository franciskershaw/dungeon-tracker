# Dungeon Tracker

![dashboard](https://res.cloudinary.com/dqdjr1d4f/image/upload/v1655024562/DungeonTracker/dungeontracker-dashboard_kbuqwd.png)

Dungeon tracker is a bespoke helper tool for players engaging with the world's most popular table-top/role-player game - Dungeons and Dragons. Having become a new player last year, I found that as a party we were often struggling to keep tabs on each other's various changeable stats (such as hit points, or spell slots) while using [Roll20](https://roll20.net/) for playing online. It turns out there are not many helpers around to offer players the tools to keep track of custom statistics that will allow those running the game to better understand the state of the characters in real time. So to help out, and to further my skills as a developer and web designer, I decided to create an application to meet this need.

At the time of writing, the intention is to create the project using React, Node.JS, Express, and MongoDb (as per my previous couple of projects) in order to continue perfecting my skills in the MERN stack of technologies, while learning how to use websockets to achieve the aim of real-time data updates as players use the tool.

You can find the link to the repository [here](https://github.com/franciskershaw/dungeon-tracker), and a link to the live website will be available at a later date.

## Table of Contents
* [Planning and Design](#planning-and-design)
	* [Strategy](#strategy-what-the-project-is)
	* [Scope](#scope)
		* [Must haves](#must-haves)
		* [Nice to haves](#nice-to-haves)
	* [Structure](#structure)
	* [Skeleton](#skeleton)

## Planning and Design

### Strategy (what the project is)
A central hub of shared information monitoring the status and progress of a particular Dungeons and Dragons campaign. It essentially should serve as a dynamic wiki of an ongoing campaign that can be updated by the players so that there is a reference to call upon when needed.
**This is not to keep track of things like your level, what class or race you are, what feats you have etc. as that is handled perfectly fine in Roll 20. This is to manipulate custom properties in an area that everyone has access to - like how many spell slots or how many rages you have left.**

### Scope

#### Must haves

* Able to track and amend collective party loot and equipment (gold, rations, water etc.)
* Live update of character HP
* Able to track magic items gained and associate with a character currently using them (or be unassigned)
* Able to keep track of ongoing quests by adding new ones when they arise in-game, including relevant 
* Everyone must be able to read and contribute to this as themselves (i.e personal accounts)

#### Nice to haves

* Direct API into Roll20 so that all the info is provided by them instead of having to be manually changed by the players (probably not possible)
* Live update of people’s HP/Spell slots/Rages/Hit die etc + ‘Long Rest’ function that restores defaults
* Wiki of non-playable characters the party has encountered
Separate permissions for Dungeon Master
* Be small enough to see with Roll20 (or work well enough on mobile to be used there)
* Spell / attack lookup (can definitely use an API for this)
* Customise dashboard to move cards around (like at work)

### Structure

* Landing page (non-logged in) where you can login or register for a new account.
* Home page (logged in users) where you can view current campaigns, start a new campaign, or join an existing one.
* If you start a new campaign, you’ll be presented a form to fill out basic information (campaign name for example). When the campaign is created it will come with a unique code for others to join with and redirect to the campaign’s page.
* If you click ‘join’ campaign, it will produce a modal where you input the unique code and character name. Joining successfully will add this campaign to the home page.
* Campaign page: active players/characters, total loot, magic items, ongoing quests.
* **So basically - divide the page between party specific info and player specific info**
* Navbar contains a section that directs to campaign specific info (like the unique code for inviting others in)
* Navbar also has a home button and a sign out button, which logs the user out and returns them to the landing page

### Skeleton

![login](https://res.cloudinary.com/dqdjr1d4f/image/upload/v1655024562/DungeonTracker/dungeontracker-login_tgdjnt.png)
![home](https://res.cloudinary.com/dqdjr1d4f/image/upload/v1655024562/DungeonTracker/dungeontracker-home_ptzjds.png)
![join](https://res.cloudinary.com/dqdjr1d4f/image/upload/v1655024562/DungeonTracker/dungeontracker-join_u8r3xg.png)
![dashboard](https://res.cloudinary.com/dqdjr1d4f/image/upload/v1655024562/DungeonTracker/dungeontracker-dashboard_kbuqwd.png)
![forms](https://res.cloudinary.com/dqdjr1d4f/image/upload/v1655024562/DungeonTracker/dungeontracker-join_u8r3xg.png)

### Surface

Outside of creating low-fidelity wireframes detailing the overall structure of the website and where components will be placed, I have not yet decided on the look and feel for the website and will be coming back to this as and when.

### Data models

Using MongoDb and mongoose, the models will be as follows:

![data](https://res.cloudinary.com/dqdjr1d4f/image/upload/v1655025067/DungeonTracker/dungeon-tracker-data_ulpdml.png)



import { Transaction } from "sequelize";
import Events, { EventAttributes } from "../models/event";

const events: EventAttributes[] = [
  {
    id: 1,
    name: "none",
    icon: "",
    initEvent: "",
    finishEvent: "",
    imageUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: "birthday",
    icon: "🎂",
    initEvent: "04-15",
    finishEvent: "04-30",
    imageUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: "christmas",
    icon: "🎄",
    initEvent: "12-20",
    finishEvent: "01-05",
    imageUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    name: "halloween",
    icon: "🎃",
    initEvent: "10-20",
    finishEvent: "11-05",
    imageUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    name: "summer",
    icon: "🌴",
    initEvent: "08-01",
    finishEvent: "08-15",
    imageUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 6,
    name: "valentine",
    icon: "💘",
    initEvent: "02-01",
    finishEvent: "02-15",
    imageUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const createEvents = async (t: Transaction): Promise<void> => {
  try {
    let eventsToInsert: EventAttributes[] = [];

    await Promise.all(
      events.map(async (event) => {
        const eventInsert = await Events.findByPk(event.id);
        if (!eventInsert) {
          eventsToInsert.push(event);
        }
      })
    );

    await Events.bulkCreate(eventsToInsert, { transaction: t });

    global.logger.info(`Inserted events ${eventsToInsert.length} news`);
    return;
  } catch (error) {}
};

export { createEvents };

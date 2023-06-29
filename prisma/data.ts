export const locations = [
  {
    id: "boulders_sydhavn",
    name: "Boulders Sydhavn",
    latitude: 55.6411848747633,
    longitude: 12.5388136601283
  },
  {
    name: "Boulders Hvidovre",
    latitude: 55.6270653959441,
    longitude: 12.4843080544021
  },
  {
    name: "Boulders Valby",
    latitude: 55.6615105115468,
    longitude: 12.5152530144064
  },
  {
    name: "Nørrebro Klatreklub",
    latitude: 55.6998879926746,
    longitude: 12.543317898565
  },
  {
    name: "BaNanna Park",
    latitude: 55.6998214866745,
    longitude: 12.54975520052
  },
  {
    name: "Blocs & Walls",
    latitude: 55.6931813383737,
    longitude: 12.6124719606703
  }
];

export const grades = [
  {
    name: "green"
  },
  {
    name: "yellow"
  },
  {
    name: "orange"
  },
  {
    name: "blue"
  },
  {
    name: "purple"
  },
  {
    name: "red"
  },
  {
    name: "black"
  },
  {
    name: "pink"
  }
];

const linkToBouldersSydhavn = {
  connect: {
    name: "Boulders Sydhavn"
  }
};

export const zones = [
  {
    name: "Slab to 15°",
    changeSchedule: {
      create: {
        startDate: new Date("2022-08-01"),
        changeIntervalWeeks: 6
      }
    }
  },
  {
    name: "Amfi",
    changeSchedule: {
      create: {
        startDate: new Date("2022-08-15"),
        changeIntervalWeeks: 6
      }
    }
  },
  {
    name: "10° Vest",
    changeSchedule: {
      create: {
        startDate: new Date("2022-08-18"),
        changeIntervalWeeks: 6
      }
    }
  },
  {
    name: "20° Vest",
    changeSchedule: {
      create: {
        startDate: new Date("2022-08-18"),
        changeIntervalWeeks: 6
      }
    }
  },
  {
    name: "Taget",
    changeSchedule: {
      create: {
        startDate: new Date("2022-08-22"),
        changeIntervalWeeks: 6
      }
    }
  },
  {
    name: "35° Vest",
    changeSchedule: {
      create: {
        startDate: new Date("2022-08-25"),
        changeIntervalWeeks: 6
      }
    }
  },
  {
    name: "50° Vest",
    changeSchedule: {
      create: {
        startDate: new Date("2022-08-25"),
        changeIntervalWeeks: 6
      }
    }
  },
  {
    name: "Bambus 5° - 15°",
    changeSchedule: {
      create: {
        startDate: new Date("2022-08-29"),
        changeIntervalWeeks: 6
      }
    }
  },
  {
    name: "Skibet",
    changeSchedule: {
      create: {
        startDate: new Date("2022-09-01"),
        changeIntervalWeeks: 6
      }
    }
  },
  {
    name: "Bambus slab",
    changeSchedule: {
      create: {
        startDate: new Date("2022-09-05"),
        changeIntervalWeeks: 6
      }
    }
  },
  {
    name: "Bambus 10°",
    changeSchedule: {
      create: {
        startDate: new Date("2022-09-12"),
        changeIntervalWeeks: 6
      }
    }
  },
  {
    name: "Slab",
    changeSchedule: {
      create: {
        startDate: new Date("2022-09-26"),
        changeIntervalWeeks: 6
      }
    }
  },
  {
    name: "Compface",
    changeSchedule: {
      create: {
        startDate: new Date("2022-09-26"),
        changeIntervalWeeks: 6
      }
    }
  },
  {
    name: "20° East",
    changeSchedule: {
      create: {
        startDate: new Date("2022-10-10"),
        changeIntervalWeeks: 6
      }
    }
  },
  {
    name: "35° East",
    changeSchedule: {
      create: {
        startDate: new Date("2022-10-10"),
        changeIntervalWeeks: 6
      }
    }
  }
];

export const techniques = [
  {
    name: "Jug"
  },
  {
    name: "Pinch"
  },
  {
    name: "Sloper"
  },
  {
    name: "Crimp"
  },
  {
    name: "Pocket"
  },
  {
    name: "Undercling"
  },
  {
    name: "Gaston"
  },
  {
    name: "Dyno"
  },
  {
    name: "Sidepull"
  },
  {
    name: "Mantle"
  },
  {
    name: "Hooking"
  }
];

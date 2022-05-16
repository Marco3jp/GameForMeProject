import "jest"
import {NudgeDirection} from "../component/service/nudging";
import {Nudging} from "./nudging";

type testCase = {
    name: string
    in: {
        directionOfMovement: number, nudgeDirection: NudgeDirection
    }
    expected: {
        directionOfMovement: number,
    }
}

const testCases: testCase[] = [
    {
        name: "directionOfMovement : nudgeDirection = 270 : RIGHT",
        in: {
            directionOfMovement: 270,
            nudgeDirection: NudgeDirection.RIGHT
        },
        expected: {
            directionOfMovement: 315,
        }
    },
    {
        name: "directionOfMovement : nudgeDirection = 270 : LEFT",
        in: {
            directionOfMovement: 270,
            nudgeDirection: NudgeDirection.LEFT
        },
        expected: {
            directionOfMovement: 225,
        }
    },
    {
        name: "directionOfMovement : nudgeDirection = 90 : RIGHT",
        in: {
            directionOfMovement: 90,
            nudgeDirection: NudgeDirection.RIGHT
        },
        expected: {
            directionOfMovement: 45,
        }
    },
    {
        name: "directionOfMovement : nudgeDirection = 90 : LEFT",
        in: {
            directionOfMovement: 90,
            nudgeDirection: NudgeDirection.LEFT
        },
        expected: {
            directionOfMovement: 135,
        }
    },
    {
        name: "directionOfMovement : nudgeDirection = 30 : LEFT",
        in: {
            directionOfMovement: 30,
            nudgeDirection: NudgeDirection.LEFT
        },
        expected: {
            directionOfMovement: 105,
        }
    },
    {
        name: "directionOfMovement : nudgeDirection = 60 : LEFT",
        in: {
            directionOfMovement: 60,
            nudgeDirection: NudgeDirection.LEFT
        },
        expected: {
            directionOfMovement: 120,
        }
    },
    {
        name: "directionOfMovement : nudgeDirection = 60 : RIGHT",
        in: {
            directionOfMovement: 60,
            nudgeDirection: NudgeDirection.RIGHT
        },
        expected: {
            directionOfMovement: 30,
        }
    },
    {
        name: "directionOfMovement : nudgeDirection = 210 : LEFT",
        in: {
            directionOfMovement: 210,
            nudgeDirection: NudgeDirection.LEFT
        },
        expected: {
            directionOfMovement: 195,
        }
    },
    {
        name: "directionOfMovement : nudgeDirection = 300 : LEFT",
        in: {
            directionOfMovement: 300,
            nudgeDirection: NudgeDirection.LEFT
        },
        expected: {
            directionOfMovement: 240,
        }
    },
    {
        name: "directionOfMovement : nudgeDirection = 300 : RIGHT",
        in: {
            directionOfMovement: 300,
            nudgeDirection: NudgeDirection.RIGHT
        },
        expected: {
            directionOfMovement: 330,
        }
    },
    {
        name: "directionOfMovement : nudgeDirection = 240 : RIGHT",
        in: {
            directionOfMovement: 240,
            nudgeDirection: NudgeDirection.RIGHT
        },
        expected: {
            directionOfMovement: 300,
        }
    },
    {
        name: "directionOfMovement : nudgeDirection = 180 : LEFT",
        in: {
            directionOfMovement: 180,
            nudgeDirection: NudgeDirection.LEFT
        },
        expected: {
            directionOfMovement: 180,
        }
    },
    {
        name: "directionOfMovement : nudgeDirection = 180 : RIGHT",
        in: {
            directionOfMovement: 180,
            nudgeDirection: NudgeDirection.RIGHT
        },
        expected: {
            directionOfMovement: 180, // thinking
        }
    },
    {
        name: "directionOfMovement : nudgeDirection = 0 : RIGHT",
        in: {
            directionOfMovement: 0,
            nudgeDirection: NudgeDirection.RIGHT
        },
        expected: {
            directionOfMovement: 0,
        }
    },
    {
        name: "directionOfMovement : nudgeDirection = 0 : RIGHT",
        in: {
            directionOfMovement: 360,
            nudgeDirection: NudgeDirection.RIGHT
        },
        expected: {
            directionOfMovement: 0,
        }
    },
]

const nudging = new Nudging()

testCases.forEach(testCase => {
    test(testCase.name, () => {
        const result = nudging.calculateNudging(testCase.in.directionOfMovement, testCase.in.nudgeDirection)
        expect(result).toBe(testCase.expected.directionOfMovement);
    })
})
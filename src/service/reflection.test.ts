import "jest"
import {reflectionInput} from "../component/service/reflection";
import {Reflection} from "./reflection";

type testCase = {
    name: string
    in: {
        reflection: reflectionInput,
        wall: reflectionInput
    }
    expected: {
        angle: number,
        throwError: boolean
    }
}

const testCases: testCase[] = [
    {
        name: "reflective : wall = 45 : 0",
        in: {
            reflection: {
                angle: 45
            },
            wall: {
                angle: 0
            }
        },
        expected: {
            angle: 315,
            throwError: false
        }
    },
    {
        name: "reflective : wall = 90 : 0",
        in: {
            reflection: {
                angle: 90
            },
            wall: {
                angle: 0
            }
        },
        expected: {
            angle: 270,
            throwError: false
        }
    },
    {
        name: "reflective : wall = 0 : 15",
        in: {
            reflection: {
                angle: 0
            },
            wall: {
                angle: 15
            }
        },
        expected: {
            angle: 30,
            throwError: false
        }
    },
    {
        name: "reflective : wall = 45 : 15",
        in: {
            reflection: {
                angle: 45
            },
            wall: {
                angle: 15
            }
        },
        expected: {
            angle: 345,
            throwError: false
        }
    },
    {
        name: "reflective : wall = 90 : 15",
        in: {
            reflection: {
                angle: 90
            },
            wall: {
                angle: 15
            }
        },
        expected: {
            angle: 300,
            throwError: false
        }
    },
    {
        name: "reflective : wall = 0 : 45",
        in: {
            reflection: {
                angle: 0
            },
            wall: {
                angle: 45
            }
        },
        expected: {
            angle: 90,
            throwError: false
        }
    },
    {
        name: "reflective : wall = 90 : 45",
        in: {
            reflection: {
                angle: 90
            },
            wall: {
                angle: 45
            }
        },
        expected: {
            angle: 0,
            throwError: false
        }
    },
    {
        name: "reflective : wall = 0 : 75",
        in: {
            reflection: {
                angle: 0
            },
            wall: {
                angle: 75
            }
        },
        expected: {
            angle: 150,
            throwError: false
        }
    },
    {
        name: "reflective : wall = 45 : 75",
        in: {
            reflection: {
                angle: 45
            },
            wall: {
                angle: 75
            }
        },
        expected: {
            angle: 105,
            throwError: false
        }
    },
    {
        name: "reflective : wall = 90 : 75",
        in: {
            reflection: {
                angle: 90
            },
            wall: {
                angle: 75
            }
        },
        expected: {
            angle: 60,
            throwError: false
        }
    },
    {
        name: "reflective : wall = 0 : 90",
        in: {
            reflection: {
                angle: 0
            },
            wall: {
                angle: 90
            }
        },
        expected: {
            angle: 180,
            throwError: false
        }
    },
    {
        name: "reflective : wall = 45 : 90",
        in: {
            reflection: {
                angle: 45
            },
            wall: {
                angle: 90
            }
        },
        expected: {
            angle: 135,
            throwError: false
        }
    },
    {
        name: "reflective : wall = 45 : 135",
        in: {
            reflection: {
                angle: 45
            },
            wall: {
                angle: 135
            }
        },
        expected: {
            angle: 225,
            throwError: false
        }
    },
    {
        name: "reflective : wall = 200 : 135",
        in: {
            reflection: {
                angle: 200
            },
            wall: {
                angle: 135
            }
        },
        expected: {
            angle: 70,
            throwError: false
        }
    },
    {
        name: "reflective : wall = 300 : 230",
        in: {
            reflection: {
                angle: 300
            },
            wall: {
                angle: 230
            }
        },
        expected: {
            angle: 160,
            throwError: false
        }
    },
    {
        name: "reflective : wall = 30 : 240",
        in: {
            reflection: {
                angle: 30
            },
            wall: {
                angle: 240
            }
        },
        expected: {
            angle: 90,
            throwError: false
        }
    },
    {
        name: "reflective : wall = 10 : 320",
        in: {
            reflection: {
                angle: 10
            },
            wall: {
                angle: 320
            }
        },
        expected: {
            angle: 270,
            throwError: false
        }
    }
]

// TODO: 特にエラーをスローするケースが用意できてないわね〜〜〜って感じ
// 壁とオブジェクトが同じ角度のケース必要？
const reflection = new Reflection()

testCases.forEach(testCase => {
    test(testCase.name, () => {
        const result = reflection.calculateWithLine(testCase.in.reflection, testCase.in.wall)
        expect(result).toBe(testCase.expected.angle);
    })
})
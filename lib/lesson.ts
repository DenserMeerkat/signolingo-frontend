import { CharacterType, QuestionCharacter, QuestionType } from "@/types";

type StrNumNumArrType = [string, number, number];
type StrNumArrType = [string, number];


export function getLesson(progress : Record<string, number>, characterType : CharacterType) : QuestionCharacter[] {
    if (characterType == CharacterType.Alphabets) {
        const alphabet_groups = [["A", "E", "I", "O", "U"], ["T", "N", "S", "R"], ["D", "L", "C", "M", "P"], ["H", "G", "B", "F"], ["Y", "W", "V", "K"], ["X", "J", "Q", "Z"]];
        let start = -1;
        let old_cnt: StrNumArrType[] = [];
        let zero: StrNumNumArrType[] = [];
        let threshold = 80;
        const master = [];
        for (let i = alphabet_groups.length - 1; i >= 0; i--) {
            let helper = 0;
            for (let j = 0; j < alphabet_groups[i].length; j++) {
                const temp = alphabet_groups[i][j];
                if (progress[temp] === 0) {
                    helper += 1;
                    zero.push([temp, i, j]);
                }
                if (progress[temp] > 0 && progress[temp] < threshold) {
                    old_cnt.push([temp, progress[temp]]);
                }
                if (progress[temp] >= threshold) {
                    master.push(temp);
                }
            }
            if (helper >= 2) {
                start = i;
            }
        }
        if (start === -1) {
            zero.sort((a, b) => {
                if (a[1] === b[1]) {
                    return a[2] - b[2];
                }
                return a[1] - b[1];
            });
            const count = Math.min(2, zero.length);
            old_cnt.sort((a, b) => a[1] - b[1]);
            const current = [];
            for (let j = 0; j < count; j++) {
                current.push(zero[j][0]);
            }
            let k = 0;
            for (let i = 0; i < 5 - count; i++) {
                let fl = 0;
                while (k < old_cnt.length) {
                    k += 1;
                    if (k - 1 < old_cnt.length) {
                        fl = 1;
                    }
                    break;
                }
                if (fl === 1) {
                    current.push(old_cnt[k - 1][0]);
                } else {
                    break;
                }
            }
            if (current.length < 5) {
                k = 0;
                const kkk = current.length;
                master.reverse();
                for (let i = 0; i < 5 - kkk; i++) {
                    let fl = 0;
                    while (k < master.length) {
                        k += 1;
                        if (k - 1 < master.length) {
                            fl = 1;
                        }
                        break;
                    }
                    if (fl === 1) {
                        current.push(master[k - 1]);
                    } else {
                        break;
                    }
                }
            }
            let n_0 = 0;
            let n_non0 = 0;
            for (let i = 0; i < current.length; i++) {
                const tem = current[i];
                if (progress[tem] === 0) {
                    n_0 += 1;
                } else {
                    n_non0 += 1;
                }
            }
            const questions = new Array(n_0 * 3 + n_non0 * 2).fill(0);
            for (let i = 0; i < current.length; i++) {
                const temp = current[i];
                if (progress[temp] === 0) {
                    const q1 = {
                        character: temp,
                        questionType : QuestionType.Introduction,
                        options: [],
                    } as QuestionCharacter;
                    const q2 = 
                    {
                        character: temp,
                        questionType : QuestionType.SignWithHint,
                        options: [],
                    } as QuestionCharacter;
                    const taken = new Array(26).fill(0);
                    taken[temp.charCodeAt(0) - 65] = 1;
                    while (true) {
                        const ab = Math.floor(Math.random() * 26);
                        if (taken[ab] === 0) {
                            taken[ab] = 1;
                            if (taken.filter(t => t === 1).length === 4) {
                                break;
                            }
                        }
                    }
                    const op = [];
                    for (let i = 0; i < 26; i++) {
                        if (taken[i] === 1) {
                            op.push(String.fromCharCode(i + 65));
                        }
                    }
                    if (temp === "G") {
                        op.push("H");
                        if (op[0] !== temp) {
                            op.shift();
                        } else if (op[1] !== temp) {
                            op.splice(1, 1);
                        }
                    } else if (temp === "H") {
                        op.push("G");
                        if (op[0] !== temp) {
                            op.shift();
                        } else if (op[1] !== temp) {
                            op.splice(1, 1);
                        }
                    } else if (temp === "M") {
                        op.push("N");
                        if (op[0] !== temp) {
                            op.shift();
                        } else if (op[1] !== temp) {
                            op.splice(1, 1);
                        }
                    } else if (temp === "N") {
                        op.push("M");
                        if (op[0] !== temp) {
                            op.shift();
                        } else if (op[1] !== temp) {
                            op.splice(1, 1);
                        }
                    }
                    let q3 = null;
                    if (Math.floor(Math.random() * 100) % 2 === 0) {
                        q3 = {
                            character: temp,
                            questionType : QuestionType.McqCharacter,
                            options: op, 
                        } as QuestionCharacter;
                    } else {
                        q3 = 
                        {
                            character: temp,
                            questionType : QuestionType.McqSign,
                            options: op, 
                        } as QuestionCharacter;
                    }
                    for (let i = 0; i < questions.length; i++) {
                        if (questions[i] === 0) {
                            questions[i] = q1;
                            break;
                        }
                    }
                    for (let i = questions.length - 1; i >= 0; i--) {
                        if (questions[i] === 0) {
                            questions[i] = q3;
                            break;
                        }
                    }
                    for (let i = questions.length - 1; i >= 0; i--) {
                        if (questions[i] === 0) {
                            questions[i] = q2;
                            break;
                        }
                    }
                } else {
                    const q1 = 
                    {
                        character: temp,
                        questionType : QuestionType.SignWithoutHint,
                        options: [], 
                    } as QuestionCharacter;
                    const taken = new Array(26).fill(0);
                    taken[temp.charCodeAt(0) - 65] = 1;
                    while (true) {
                        const ab = Math.floor(Math.random() * 26);
                        if (taken[ab] === 0) {
                            taken[ab] = 1;
                            if (taken.filter(t => t === 1).length === 4) {
                                break;
                            }
                        }
                    }
                    const op = [];
                    for (let i = 0; i < 26; i++) {
                        if (taken[i] === 1) {
                            op.push(String.fromCharCode(i + 65));
                        }
                    }
                    let q2 = null;
                    if (temp === "G") {
                        op.push("H");
                        if (op[0] !== temp) {
                            op.shift();
                        } else if (op[1] !== temp) {
                            op.splice(1, 1);
                        }
                    } else if (temp === "H") {
                        op.push("G");
                        if (op[0] !== temp) {
                            op.shift();
                        } else if (op[1] !== temp) {
                            op.splice(1, 1);
                        }
                    } else if (temp === "M") {
                        op.push("N");
                        if (op[0] !== temp) {
                            op.shift();
                        } else if (op[1] !== temp) {
                            op.splice(1, 1);
                        }
                    } else if (temp === "N") {
                        op.push("M");
                        if (op[0] !== temp) {
                            op.shift();
                        } else if (op[1] !== temp) {
                            op.splice(1, 1);
                        }
                    }
                    if (Math.floor(Math.random() * 100) % 2) {
                        q2 = 
                        {
                            character: temp,
                            questionType : QuestionType.McqSign,
                            options: op, 
                        } as QuestionCharacter;
                    } else {
                        q2 = 
                        {
                            character: temp,
                            questionType : QuestionType.McqCharacter,
                            options: op, 
                        } as QuestionCharacter;
                    }
                    for (let i = 0; i < questions.length; i++) {
                        if (questions[i] === 0) {
                            questions[i] = q1;
                            break;
                        }
                    }
                    for (let i = questions.length - 1; i >= 0; i--) {
                        if (questions[i] === 0) {
                            questions[i] = q2;
                            break;
                        }
                    }
                }
            }
            return questions;
        } else {
            const curr = [];
            for (let j = 0; j < alphabet_groups[start].length; j++) {
                const temp = alphabet_groups[start][j];
                if (progress[temp] === 0) {
                    curr.push(temp);
                    if (curr.length === 2) {
                        break;
                    }
                }
            }
            const olden : StrNumArrType[]= [];
            const mastered = [];
            for (let j = 0; j <= start; j++) {
                for (let kk = 0; kk < alphabet_groups[j].length; kk++) {
                    const temp = alphabet_groups[j][kk];
                    if (progress[temp] === 0 && curr.length < 5 && !curr.includes(temp)) {
                        curr.push(temp);
                    } else if (progress[temp] > 0 && progress[temp] < threshold) {
                        olden.push([temp, progress[temp]]);
                    } else if (progress[temp] >= threshold) {
                        mastered.push(temp);
                    }
                }
            }
            if (curr.length < 5) {
                olden.sort((a, b) => a[1] - b[1]);
                const counter1 = 5 - curr.length;
                let k = 0;
                for (let i = 0; i < counter1; i++) {
                    let fl = 0;
                    while (k < olden.length) {
                        k += 1;
                        if (k - 1 < olden.length) {
                            fl = 1;
                        }
                        break;
                    }
                    if (fl === 1) {
                        curr.push(olden[k - 1][0]);
                    } else {
                        break;
                    }
                }
                const counter2 = 5 - curr.length;
                k = 0;
                for (let i = 0; i < counter2; i++) {
                    let fl = 0;
                    while (k < mastered.length) {
                        k += 1;
                        if (k - 1 < mastered.length) {
                            fl = 1;
                        }
                        break;
                    }
                    if (fl === 1) {
                        curr.push(mastered[k - 1]);
                    } else {
                        break;
                    }
                }
            }
            let n_0 = 0;
            let n_non0 = 0;
            for (let i = 0; i < curr.length; i++) {
                const tem = curr[i];
                if (progress[tem] === 0) {
                    n_0 += 1;
                } else {
                    n_non0 += 1;
                }
            }
            const questions = new Array(n_0 * 3 + n_non0 * 2).fill(0);
            for (let i = 0; i < curr.length; i++) {
                const temp = curr[i];
                if (progress[temp] === 0) {
                    const q1 = {
                        character: temp,
                        questionType : QuestionType.Introduction,
                        options: [], 
                    } as QuestionCharacter;
                    const q2 = 
                    {
                        character: temp,
                        questionType : QuestionType.SignWithHint,
                        options: [], 
                    } as QuestionCharacter;
                    const taken = new Array(26).fill(0);
                    taken[temp.charCodeAt(0) - 65] = 1;
                    while (true) {
                        const ab = Math.floor(Math.random() * 26);
                        if (taken[ab] === 0) {
                            taken[ab] = 1;
                            if (taken.filter(t => t === 1).length === 4) {
                                break;
                            }
                        }
                    }
                    const op = [];
                    for (let i = 0; i < 26; i++) {
                        if (taken[i] === 1) {
                            op.push(String.fromCharCode(i + 65));
                        }
                    }
                    if (temp === "G") {
                        op.push("H");
                        if (op[0] !== temp) {
                            op.shift();
                        } else if (op[1] !== temp) {
                            op.splice(1, 1);
                        }
                    } else if (temp === "H") {
                        op.push("G");
                        if (op[0] !== temp) {
                            op.shift();
                        } else if (op[1] !== temp) {
                            op.splice(1, 1);
                        }
                    } else if (temp === "M") {
                        op.push("N");
                        if (op[0] !== temp) {
                            op.shift();
                        } else if (op[1] !== temp) {
                            op.splice(1, 1);
                        }
                    } else if (temp === "N") {
                        op.push("M");
                        if (op[0] !== temp) {
                            op.shift();
                        } else if (op[1] !== temp) {
                            op.splice(1, 1);
                        }
                    }
                    let q3 = null;
                    if (Math.floor(Math.random() * 100) % 2 === 0) {
                        q3 = 
                        {
                            character: temp,
                            questionType : QuestionType.McqCharacter,
                            options: op, 
                        } as QuestionCharacter;
                    } else {
                        q3 = 
                        {
                            character: temp,
                            questionType : QuestionType.McqSign,
                            options: op, 
                        } as QuestionCharacter;
                    }
                    for (let i = 0; i < questions.length; i++) {
                        if (questions[i] === 0) {
                            questions[i] = q1;
                            break;
                        }
                    }
                    for (let i = questions.length - 1; i >= 0; i--) {
                        if (questions[i] === 0) {
                            questions[i] = q3;
                            break;
                        }
                    }
                    for (let i = questions.length - 1; i >= 0; i--) {
                        if (questions[i] === 0) {
                            questions[i] = q2;
                            break;
                        }
                    }
                } else {
                    const q1 = {
                        character: temp,
                        questionType : QuestionType.SignWithoutHint,
                        options: [], 
                    } as QuestionCharacter;
                    const taken = new Array(26).fill(0);
                    taken[temp.charCodeAt(0) - 65] = 1;
                    while (true) {
                        const ab = Math.floor(Math.random() * 26);
                        if (taken[ab] === 0) {
                            taken[ab] = 1;
                            if (taken.filter(t => t === 1).length === 4) {
                                break;
                            }
                        }
                    }
                    const op = [];
                    for (let i = 0; i < 26; i++) {
                        if (taken[i] === 1) {
                            op.push(String.fromCharCode(i + 65));
                        }
                    }
                    let q2 = null;
                    if (temp === "G") {
                        op.push("H");
                        if (op[0] !== temp) {
                            op.shift();
                        } else if (op[1] !== temp) {
                            op.splice(1, 1);
                        }
                    } else if (temp === "H") {
                        op.push("G");
                        if (op[0] !== temp) {
                            op.shift();
                        } else if (op[1] !== temp) {
                            op.splice(1, 1);
                        }
                    } else if (temp === "M") {
                        op.push("N");
                        if (op[0] !== temp) {
                            op.shift();
                        } else if (op[1] !== temp) {
                            op.splice(1, 1);
                        }
                    } else if (temp === "N") {
                        op.push("M");
                        if (op[0] !== temp) {
                            op.shift();
                        } else if (op[1] !== temp) {
                            op.splice(1, 1);
                        }
                    }
                    if (Math.floor(Math.random() * 100) % 2) {
                        q2 = {
                            character: temp,
                            questionType : QuestionType.McqSign,
                            options: op, 
                        } as QuestionCharacter;
                    } else {
                        q2 = {
                            character: temp,
                            questionType : QuestionType.McqCharacter,
                            options: op, 
                        } as QuestionCharacter;
                    }
                    for (let i = 0; i < questions.length; i++) {
                        if (questions[i] === 0) {
                            questions[i] = q1;
                            break;
                        }
                    }
                    for (let i = questions.length - 1; i >= 0; i--) {
                        if (questions[i] === 0) {
                            questions[i] = q2;
                            break;
                        }
                    }
                }
            }
            return questions;
        }
    } else {
        const current = [];
        for (let i = 65; i <= 90; i++) {
            const temp = String.fromCharCode(i);
            if (progress[temp] === 0) {
                current.push(temp);
            }
        }
        const old_cnt : StrNumArrType[] = [];
        const master = [];
        for (let i = 65; i <= 90; i++) {
            const temp = String.fromCharCode(i);
            if (progress[temp] > 0 && progress[temp] < 80) {
                old_cnt.push([temp, progress[temp]]);
            }
            if (progress[temp] >= 80) {
                master.push(temp);
            }
        }
        if (current.length < 5) {
            old_cnt.sort((a, b) => a[1] - b[1]);
            const counter = 5 - current.length;
            let k = 0;
            for (let i = 0; i < counter; i++) {
                let fl = 0;
                while (k < old_cnt.length) {
                    k += 1;
                    if (k - 1 < old_cnt.length) {
                        fl = 1;
                    }
                    break;
                }
                if (fl === 1) {
                    current.push(old_cnt[k - 1][0]);
                } else {
                    break;
                }
            }
            const counter2 = 5 - current.length;
            k = 0;
            for (let i = 0; i < counter2; i++) {
                let fl = 0;
                while (k < master.length) {
                    k += 1;
                    if (k - 1 < master.length) {
                        fl = 1;
                    }
                    break;
                }
                if (fl === 1) {
                    current.push(master[k - 1]);
                } else {
                    break;
                }
            }
        }
        let n_0 = 0;
        let n_non0 = 0;
        for (let i = 0; i < current.length; i++) {
            const tem = current[i];
            if (progress[tem] === 0) {
                n_0 += 1;
            } else {
                n_non0 += 1;
            }
        }
        const questions = new Array(n_0 * 3 + n_non0 * 2).fill(0);
        for (let i = 0; i < current.length; i++) {
            const temp = current[i];
            if (progress[temp] === 0) {
                const q1 = 
                {
                    character: temp,
                    questionType : QuestionType.Introduction,
                    options: [], 
                } as QuestionCharacter;
                const q2 = 
                {
                    character: temp,
                    questionType : QuestionType.SignWithHint,
                    options: [], 
                } as QuestionCharacter;
                const taken = new Array(26).fill(0);
                taken[temp.charCodeAt(0) - 65] = 1;
                while (true) {
                    const ab = Math.floor(Math.random() * 26);
                    if (taken[ab] === 0) {
                        taken[ab] = 1;
                        if (taken.filter(t => t === 1).length === 4) {
                            break;
                        }
                    }
                }
                const op = [];
                for (let i = 0; i < 26; i++) {
                    if (taken[i] === 1) {
                        op.push(String.fromCharCode(i + 65));
                    }
                }
                if (temp === "G") {
                    op.push("H");
                    if (op[0] !== temp) {
                        op.shift();
                    } else if (op[1] !== temp) {
                        op.splice(1, 1);
                    }
                } else if (temp === "H") {
                    op.push("G");
                    if (op[0] !== temp) {
                        op.shift();
                    } else if (op[1] !== temp) {
                        op.splice(1, 1);
                    }
                } else if (temp === "M") {
                    op.push("N");
                    if (op[0] !== temp) {
                        op.shift();
                    } else if (op[1] !== temp) {
                        op.splice(1, 1);
                    }
                } else if (temp === "N") {
                    op.push("M");
                    if (op[0] !== temp) {
                        op.shift();
                    } else if (op[1] !== temp) {
                        op.splice(1, 1);
                    }
                }
                let q3 = null;
                if (Math.floor(Math.random() * 100) % 2 === 0) {
                    q3 = {
                        character: temp,
                        questionType : QuestionType.McqCharacter,
                        options: op, 
                    } as QuestionCharacter;
                } else {
                    q3 = {
                        character: temp,
                        questionType : QuestionType.McqSign,
                        options: op, 
                    } as QuestionCharacter;
                }
                for (let i = 0; i < questions.length; i++) {
                    if (questions[i] === 0) {
                        questions[i] = q1;
                        break;
                    }
                }
                for (let i = questions.length - 1; i >= 0; i--) {
                    if (questions[i] === 0) {
                        questions[i] = q3;
                        break;
                    }
                }
                for (let i = questions.length - 1; i >= 0; i--) {
                    if (questions[i] === 0) {
                        questions[i] = q2;
                        break;
                    }
                }
            } else {
                const q1 = {
                    character: temp,
                    questionType : QuestionType.SignWithoutHint,
                    options: [], 
                } as QuestionCharacter;
                const taken = new Array(26).fill(0);
                taken[temp.charCodeAt(0) - 65] = 1;
                while (true) {
                    const ab = Math.floor(Math.random() * 26);
                    if (taken[ab] === 0) {
                        taken[ab] = 1;
                        if (taken.filter(t => t === 1).length === 4) {
                            break;
                        }
                    }
                }
                const op = [];
                for (let i = 0; i < 26; i++) {
                    if (taken[i] === 1) {
                        op.push(String.fromCharCode(i + 65));
                    }
                }
                let q2 = null;
                if (temp === "G") {
                    op.push("H");
                    if (op[0] !== temp) {
                        op.shift();
                    } else if (op[1] !== temp) {
                        op.splice(1, 1);
                    }
                } else if (temp === "H") {
                    op.push("G");
                    if (op[0] !== temp) {
                        op.shift();
                    } else if (op[1] !== temp) {
                        op.splice(1, 1);
                    }
                } else if (temp === "M") {
                    op.push("N");
                    if (op[0] !== temp) {
                        op.shift();
                    } else if (op[1] !== temp) {
                        op.splice(1, 1);
                    }
                } else if (temp === "N") {
                    op.push("M");
                    if (op[0] !== temp) {
                        op.shift();
                    } else if (op[1] !== temp) {
                        op.splice(1, 1);
                    }
                }
                if (Math.floor(Math.random() * 100) % 2) {
                    q2 = {
                        character: temp,
                        questionType : QuestionType.McqSign,
                        options: op, 
                    } as QuestionCharacter; 
                } else {
                    q2 = {
                        character: temp,
                        questionType : QuestionType.McqCharacter,
                        options: op, 
                    } as QuestionCharacter;
                }
                for (let i = 0; i < questions.length; i++) {
                    if (questions[i] === 0) {
                        questions[i] = q1;
                        break;
                    }
                }
                for (let i = questions.length - 1; i >= 0; i--) {
                    if (questions[i] === 0) {
                        questions[i] = q2;
                        break;
                    }
                }
            }
        }
        return questions;
    }
}


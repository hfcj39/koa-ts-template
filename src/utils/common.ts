import * as fs from "fs";
import dayjs from "dayjs";
import Path from "path";
import * as crypto from "crypto";
// import { User } from "../entity";
import { getRepository } from "typeorm";
import zlib from "zlib";
import _ from "lodash";

export const objectToString = (obj: any) => Object.prototype.toString.call(obj);

/**
 * 判断数据类型是否为Object
 * @param {object} arg 判断对象
 */
export const isObject = (arg: any) => objectToString(arg) === "[object Object]";

/**
 * 将object转化为数组
 * @param {object} obj 转化对象
 */
export const convertObjectToArray = (obj: any) => {
    const result = [];
    for (const [key, value] of Object.entries(obj)) {
        let temp;
        if (isObject(value)) {
            temp = JSON.stringify(value);
        } else {
            temp = value;
        }
        result.push(key, temp);
    }
    return result;
};

export const saveFile = async (path: string, fileName: string): Promise<string> => {
    const newFileName = `${+new Date()}_${fileName}`;
    const readStream = fs.createReadStream(path);
    const todayDirName = dayjs().format("YYYYMMDD");
    const baseDir = Path.join(__dirname, "../../static/", todayDirName);

    // created daily directory if not exist
    try {
        await fs.promises.mkdir(baseDir);
    } catch (error) {
        if (error.code !== "EEXIST") {
            throw error;
        }
    }

    const writeStream = fs.createWriteStream(Path.join(baseDir, newFileName));
    await new Promise((resolve, reject) => {
        readStream.pipe(writeStream).on("error", reject).on("finish", resolve);
    });

    return Path.join(todayDirName, newFileName);
};

export const isEmptyObject = (obj: any) => {
    if (obj) {
        return Object.keys(obj).length === 0;
    } else {
        return true;
    }
};

export const cleanEmptyKey = (obj: Record<string, any>) => {
    Object.keys(obj).forEach((key) => (obj[key] == null || obj[key] === "" || (typeof obj[key] === "number" && isNaN(obj[key]))) && delete obj[key]);
    return obj;
};

export const cleanEmptyKey_deep = (obj: Record<string, any>) => {
    Object.entries(obj).forEach(([key, val]) => {
        if (val && typeof val === "object") {
            cleanEmptyKey_deep(val);
        } else if (obj[key] == null || obj[key] === "" || (typeof obj[key] === "number" && isNaN(obj[key]))) {
            delete obj[key];
        }
    });
    return obj;
};

export const hashPassword = (password: string): string => {
    return crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");
};

export const md5Hash = (content: string): string => {
    return crypto
        .createHash("md5")
        .update(content)
        .digest("hex");
};

// export const initRootUser = async (): Promise<string> => {
//     const user = getRepository(User);
//     const existRootUser = await user.findOne({ where: { username: "admin" } });
//     if (!existRootUser) {
//         const newUser = new User();
//         newUser.username = "admin";
//         newUser.password = hashPassword("admin");
//         newUser.role = "admin";
//         await user.save(newUser);
//         return "初始化 root admin 成功";
//     } else {
//         return "已存在root admin";
//     }
// };

export class GitlabError extends Error {
    constructor(gitlabError: string, ...params: any[]) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, GitlabError);
        }

        this.name = "GitlabError";
        this.message = gitlabError;
    }
}

/**
 * 遍历获取所有文件
 * @param {string} absPath 绝对路径
 * @param {string} relPath 相对路径
 * @param {string} name 名称
 */
export const getAllFilesFromPath = async (absPath: string, relPath: string = "/", name: string = relPath): Promise<any> => {
    const stats = fs.statSync(absPath);
    if (stats.isFile()) {
        return { path: relPath, name };
    } else if (stats.isDirectory()) {
        const subFiles = await Promise.all(
            fs.readdirSync(absPath)
                .map(async path => await getAllFilesFromPath(Path.join(absPath, path), Path.join(relPath, path), path))
        );
        return _.flatten(subFiles);
    }

    return Promise.reject("invalid path: " + absPath);
};
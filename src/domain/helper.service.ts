export class HelperService {
  public static urlFriendly(
    value: string,
    valuechange: string = "",
    min: string | number = "",
  ): string {
    if (valuechange.trim() === "") {
      return value.trim();
    }

    let pattern = /[^a-zA-Z0-9]/u;

    const replace = [
      "á",
      "à",
      "é",
      "è",
      "í",
      "ì",
      "ó",
      "ò",
      "ú",
      "ù",
      "ñ",
      "Ñ",
      "Á",
      "À",
      "É",
      "È",
      "Í",
      "Ì",
      "Ó",
      "Ò",
      "Ú",
      "Ù",
    ];
    const change = [
      "a",
      "a",
      "e",
      "e",
      "i",
      "i",
      "o",
      "o",
      "u",
      "u",
      "n",
      "N",
      "A",
      "A",
      "E",
      "E",
      "I",
      "I",
      "O",
      "O",
      "U",
      "U",
    ];

    let str = value;

    replace.forEach((char, index) => {
      const reg = new RegExp(char, "g");
      str = str.replace(reg, change[index]);
    });

    str = str.replace(pattern, " ").replace(/\s\s+/g, " ");

    let result = str;
    if (min === 1 || min === "1") {
      result = str.toUpperCase();
    } else if (min === 0 || min === "0") {
      result = str.toLowerCase();
    }

    return result.trim().split(" ").join(valuechange);
  }
}

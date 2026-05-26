import type { ParsedCommand, VoiceLanguage } from '../store/types';

interface KeywordMap {
  [key: string]: string;
}

const zhKeywords: KeywordMap = {
  '上升': 'moveUp',
  '升高': 'moveUp',
  '抬起': 'moveUp',
  '升起': 'moveUp',
  '头部上升': 'moveUp',
  '床上升': 'moveUp',
  '背部上升': 'moveUp',
  '起来': 'moveUp',
  '向上': 'moveUp',

  '下降': 'moveDown',
  '降低': 'moveDown',
  '放下': 'moveDown',
  '头部下降': 'moveDown',
  '床下降': 'moveDown',
  '背部下降': 'moveDown',
  '下去': 'moveDown',
  '向下': 'moveDown',
  '放平': 'moveDown',

  '停止': 'stopMovement',
  '停': 'stopMovement',
  '暂停': 'stopMovement',
  '停下': 'stopMovement',

  '紧急停止': 'emergencyStop',
  '急停': 'emergencyStop',
  '紧急': 'emergencyStop',

  '报警开': 'alarmEnable',
  '开启报警': 'alarmEnable',
  '打开报警': 'alarmEnable',

  '报警关': 'alarmDisable',
  '关闭报警': 'alarmDisable',
  '关报警': 'alarmDisable',

  '加速': 'increaseSpeed',
  '快一点': 'increaseSpeed',
  '快点': 'increaseSpeed',

  '减速': 'decreaseSpeed',
  '慢一点': 'decreaseSpeed',
  '慢点': 'decreaseSpeed',

  '升高床': 'increaseHeight',
  '调高': 'increaseHeight',
  '床升高': 'increaseHeight',
  '高度升高': 'increaseHeight',

  '降低床': 'decreaseHeight',
  '调低': 'decreaseHeight',
  '床降低': 'decreaseHeight',
  '高度降低': 'decreaseHeight',
};

const enKeywords: KeywordMap = {
  'raise': 'moveUp',
  'up': 'moveUp',
  'head up': 'moveUp',
  'bed up': 'moveUp',
  'lift': 'moveUp',
  'elevate': 'moveUp',
  'sit up': 'moveUp',

  'lower': 'moveDown',
  'down': 'moveDown',
  'head down': 'moveDown',
  'bed down': 'moveDown',
  'recline': 'moveDown',
  'flat': 'moveDown',
  'lie down': 'moveDown',

  'stop': 'stopMovement',
  'halt': 'stopMovement',
  'pause': 'stopMovement',
  'freeze': 'stopMovement',

  'emergency stop': 'emergencyStop',
  'emergency': 'emergencyStop',
  'abort': 'emergencyStop',
  'red alert': 'emergencyStop',

  'alarm on': 'alarmEnable',
  'enable alarm': 'alarmEnable',
  'turn on alarm': 'alarmEnable',

  'alarm off': 'alarmDisable',
  'disable alarm': 'alarmDisable',
  'turn off alarm': 'alarmDisable',

  'faster': 'increaseSpeed',
  'speed up': 'increaseSpeed',
  'quicker': 'increaseSpeed',

  'slower': 'decreaseSpeed',
  'speed down': 'decreaseSpeed',

  'height up': 'increaseHeight',
  'raise height': 'increaseHeight',
  'higher': 'increaseHeight',

  'height down': 'decreaseHeight',
  'lower height': 'decreaseHeight',
};

export class CommandParser {
  static parse(text: string, language: VoiceLanguage): ParsedCommand | null {
    const keywords = language === 'zh-CN' ? zhKeywords : enKeywords;
    const lower = text.toLowerCase().trim();

    // Try longest match first
    const entries = Object.entries(keywords).sort((a, b) => b[0].length - a[0].length);

    for (const [keyword, action] of entries) {
      if (lower.includes(keyword.toLowerCase())) {
        return { action, params: {} };
      }
    }

    return null;
  }

  static getCommands(language: VoiceLanguage): string[] {
    const keywords = language === 'zh-CN' ? zhKeywords : enKeywords;
    return [...new Set(Object.keys(keywords))];
  }
}

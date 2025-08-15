"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIService = void 0;
require("dotenv/config");
var openai_1 = require("openai");
var OpenAIService = /** @class */ (function () {
    function OpenAIService() {
        var apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            throw new Error('OPENAI_API_KEY environment variable is required');
        }
        this.openai = new openai_1.default({
            apiKey: apiKey,
        });
    }
    OpenAIService.prototype.generateHooksAndCTAs = function (topic) {
        return __awaiter(this, void 0, void 0, function () {
            var prompt_1, completion, response, parsed, error_1;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        prompt_1 = "Generate 5 compelling hooks and 5 call-to-actions for a social media post about \"".concat(topic, "\". \n\n      Hooks should be attention-grabbing and make people want to read more. They should use proven copywriting techniques like:\n      - Curiosity gaps\n      - Pain points\n      - Social proof\n      - Specific numbers/statistics\n      - Controversial statements\n      \n      Call-to-actions should be clear, action-oriented, and create urgency. They should:\n      - Use action verbs\n      - Create FOMO (fear of missing out)\n      - Be specific about the benefit\n      - Include urgency when appropriate\n      \n      Return the response in this exact JSON format:\n      {\n        \"hooks\": [\"hook1\", \"hook2\", \"hook3\", \"hook4\", \"hook5\"],\n        \"ctas\": [\"cta1\", \"cta2\", \"cta3\", \"cta4\", \"cta5\"]\n      }\n      \n      Make sure each hook and CTA is unique and compelling. Don't include quotes around the text.");
                        return [4 /*yield*/, this.openai.chat.completions.create({
                                model: 'gpt-4-turbo-preview',
                                messages: [
                                    {
                                        role: 'system',
                                        content: 'You are an expert copywriter specializing in creating compelling social media hooks and call-to-actions. You understand human psychology and what drives engagement.'
                                    },
                                    {
                                        role: 'user',
                                        content: prompt_1
                                    }
                                ],
                                temperature: 0.8,
                                max_tokens: 1000,
                            })];
                    case 1:
                        completion = _c.sent();
                        response = (_b = (_a = completion.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content;
                        if (!response) {
                            throw new Error('No response from OpenAI');
                        }
                        // Try to parse the JSON response
                        try {
                            parsed = JSON.parse(response);
                            return [2 /*return*/, {
                                    hooks: parsed.hooks || [],
                                    ctas: parsed.ctas || []
                                }];
                        }
                        catch (parseError) {
                            // If JSON parsing fails, fall back to a structured response
                            console.warn('Failed to parse OpenAI response as JSON, using fallback');
                            return [2 /*return*/, this.generateFallbackContent(topic)];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _c.sent();
                        console.error('OpenAI API error:', error_1);
                        // Return fallback content if OpenAI fails
                        return [2 /*return*/, this.generateFallbackContent(topic)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OpenAIService.prototype.generateFallbackContent = function (topic) {
        // Fallback content when OpenAI is unavailable
        var hooks = [
            "Discover the ".concat(topic, " secret that 95% of people don't know about"),
            "How I used ".concat(topic, " to increase my results by 300% in just 30 days"),
            "The ".concat(topic, " method that changed everything for me"),
            "Why traditional ".concat(topic, " approaches are failing you"),
            "The ".concat(topic, " breakthrough that experts don't want you to know")
        ];
        var ctas = [
            "Get your free ".concat(topic, " guide now"),
            "Start your ".concat(topic, " journey today"),
            "Unlock the power of ".concat(topic, " in minutes"),
            "Join thousands mastering ".concat(topic),
            "Transform your ".concat(topic, " results instantly")
        ];
        return { hooks: hooks, ctas: ctas };
    };
    return OpenAIService;
}());
exports.OpenAIService = OpenAIService;

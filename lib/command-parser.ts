export type ParsedCommand = {
  rawName: string
  name: string
  args: string[]
}

export function parseCommandInput(input: string): ParsedCommand {
  const [rawName = '', ...args] = input.trim().split(/\s+/).filter(Boolean)
  return { rawName, name: rawName.toLowerCase(), args }
}
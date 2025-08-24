import * as Toolbar from "@radix-ui/react-toolbar";
import * as Select from "@radix-ui/react-select";
import {
    FaBold,
    FaUnderline,
    FaItalic,
    FaAlignLeft,
    FaAlignCenter,
    FaAlignRight
} from 'react-icons/fa6';

export default function RTToolbar() {
    return (
        <Toolbar.Root
            className="flex w-full min-w-max rounded-md bg-white p-2.5"
            aria-label="Formatting options"
        >
            <Toolbar.ToggleGroup type="multiple" aria-label="Text formatting">
                <Toolbar.ToggleItem
                    className="data-[state=on]:text-red-600 ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-black outline-none first:ml-0 hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
                    value="bold"
                    aria-label="Bold"
                >
                    <FaBold />
                </Toolbar.ToggleItem>
                <Toolbar.ToggleItem
                    className="data-[state=on]:text-red-600 ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-black outline-none first:ml-0 hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
                    value="italic"
                    aria-label="Italic"
                >
                    <FaItalic />
                </Toolbar.ToggleItem>
                <Toolbar.ToggleItem
                    className="data-[state=on]:text-red-600 ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-black outline-none first:ml-0 hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
                    value="strikethrough"
                    aria-label="Strike through"
                >
                    <FaUnderline />
                </Toolbar.ToggleItem>
            </Toolbar.ToggleGroup>
            <Toolbar.Separator className="mx-2.5 w-px bg-black" />
            <Toolbar.ToggleGroup
                type="single"
                defaultValue="center"
                aria-label="tag type"
            >
                <Toolbar.ToggleItem
                    className="data-[state=on]:text-red-600 ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-black outline-none first:ml-0 hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
                    value="left"
                    aria-label="Left aligned"
                >
                    <FaAlignLeft />
                </Toolbar.ToggleItem>
                <Toolbar.ToggleItem
                    className="data-[state=on]:text-red-600 ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-black outline-none first:ml-0 hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
                    value="center"
                    aria-label="Center aligned"
                >
                    <FaAlignCenter />
                </Toolbar.ToggleItem>
                <Toolbar.ToggleItem
                    className="data-[state=on]:text-red-600 ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-black outline-none first:ml-0 hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
                    value="right"
                    aria-label="Right aligned"
                >
                    <FaAlignRight />
                </Toolbar.ToggleItem>
            </Toolbar.ToggleGroup>
            <Toolbar.Separator className="mx-2.5 w-px bg-black" />
            <Select.Root>
                <Select.Trigger>
                    kk
                </Select.Trigger>
                <Select.Portal>
                    <Select.Content className="bg-red-100">
                        <Select.Viewport>
                            <Select.Item>
                                ol
                                <Select.ItemIndicator />
                            </Select.Item>

                            <Select.Group>
                                <Select.Label />
                                <Select.Item>
                                    h1
                                    <Select.ItemIndicator />
                                </Select.Item>
                            </Select.Group>

                            <Select.Separator />
                        </Select.Viewport>
                        <Select.Arrow />
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
            <Toolbar.Button
                className="inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-violet9 px-2.5 text-[13px] leading-none text-black outline-none hover:bg-violet10 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7"
                style={{ marginLeft: "auto" }}
            >
                Share
            </Toolbar.Button>
        </Toolbar.Root>
    )
};

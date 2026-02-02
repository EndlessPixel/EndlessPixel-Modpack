const std = @import("std");
pub fn main() void {
    _ = std.process.Child.run(.{
        .allocator = std.heap.page_allocator,
        .argv = &.{ "xdg-open", "https://www.endlesspixel.fun/downloads/modpack" },
    }) catch return;
}
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField, ChannelType } = require('discord.js');
//const { reportschema, findOne } = require('../../Schemas.js/reportsetup');
const reportSchema = require('../../Schemas.js/reportsetup')
module.exports = {
    data: new SlashCommandBuilder()
    .setName("report")
    .setDMPermission(false)
    .setDescription("Setup a report system for your server")
    .addSubcommand(command => command
        .setName("setup")
        .setDescription("Setup a report system for your server")
        .addChannelOption(option => option.setName('channel').setDescription('Specified channel will receive your reports').setRequired(true))
    )
    .addSubcommand(command => command
        .setName("disable")
        .setDescription("Disable the report system of your server")
    ),
    
    async execute(interaction) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply ({ content: "You **do not** have the permission to do that!", ephemeral: true});

        const sub = interaction.options.getSubcommand();
        switch (sub) {

        case 'setup':

        const channel = interaction.options.getChannel('channel');
        const reportset = await reportschema.findOne({ Guild: interaction.guild.id });

        if (reportset) return interaction.reply({ content: `You have **already** setup the reporting system. \n> Do **/report disable** to undo.`, ephemeral: true})
        else {

            /*await reportSchema.create({
                Guild: interaction.guild.id,
                Channel: channel.id
            })*/
           //compile all informations
           const newInfo = new reportSchema({
                Guild: interaction.guild.id,
                Channel: channel.id
           })
           //save all informations in the var and make it usable using the variable saveNewInfo
           const saveNewInfo = await newInfo.save()

            const embed = new EmbedBuilder()
            .setColor("DarkRed")
            .setTimestamp()
            .setTitle(`> Reports Enabled`)
            .setAuthor({ name: `Reports Tool`})
            .setFooter({ text: `Reports Setup`})
            .setTimestamp()
            .setFields({ name: `• Reports Enabled`, value: `> The channel ${channel} has been \n> set up as your reports channel. \n> It will now receive reports from \n> your members.`, inline: false})

            await interaction.reply({ embeds: [embed] });

        }
        
        break;
                
        case 'disable':

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply ({ content: "You **do not** have the permission to do that!", ephemeral: true});

        const reportdata = await reportschema.findOne({ Guild: interaction.guild.id });
        if (!reportdata) return await interaction.reply({ content: `You **have not** setup your reporting system yet. \n> Do **/report setup** to setup your reports.`, ephemeral: true})
        else {

            await reportschema.deleteMany({
                Guild: interaction.guild.id
            })

            const embed1 = new EmbedBuilder()
            .setColor("#68c4fc")
            .setTimestamp()
            .setTitle(`> Reports Disabled`)
            .setAuthor({ name: `Reports Tool`})
            .setFooter({ text: `Reports Disabled`})
            .setTimestamp()
            .setFields({ name: `• Reports Disabled`, value: `> You will no longer be able to \n> receive reports from your users \n> this is not recommended.`, inline: false})

            await interaction.reply({ embeds: [embed1] });
        }
        }
    }
}